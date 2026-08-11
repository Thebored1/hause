# Deploying to Vercel

The app runs on SQLite and local file uploads in development, and on Postgres
and Vercel Blob in production. Which one is used is decided by environment
variables — there is no separate build.

```ts
// src/payload.config.ts
DATABASE_URI.startsWith("postgres") ? postgresAdapter(…) : sqliteAdapter(…)
BLOB_READ_WRITE_TOKEN ? vercelBlobStorage(…) : local public/uploads
```

**Why this is required, not optional:** Vercel's filesystem is read-only and
ephemeral. A file-backed database (`payload.db`) and uploads written to
`public/uploads` are both lost on every deploy, and cannot be written to at
runtime at all.

---

## 1. Create a Postgres database

Vercel → **Storage** → **Create** → Postgres (Neon or Supabase work equally
well). Copy the connection string; it looks like:

```
postgres://user:password@host/dbname?sslmode=require
```

## 2. Create a Blob store

Vercel → **Storage** → **Create** → Blob. Vercel injects
`BLOB_READ_WRITE_TOKEN` into the project automatically once it is connected.

## 3. Set environment variables

Project → **Settings** → **Environment Variables**:

| Variable | Value | Notes |
| --- | --- | --- |
| `PAYLOAD_SECRET` | a long random string | Signs session tokens. The build **fails deliberately** in production if this is missing. |
| `DATABASE_URI` | the `postgres://…` string | Selects the Postgres adapter. |
| `BLOB_READ_WRITE_TOKEN` | set by Vercel | Selects Blob storage for uploads. |
| `NEXT_IMAGE_HOSTS` | `xxxx.public.blob.vercel-storage.com` | **Needed once Blob storage is on.** Uploads are then served from the blob host, and `next/image` refuses any remote host not listed — without this, uploaded images silently fail to render. Comma-separated; copy the hostname from any uploaded file's URL. |

### Email (enquiry notifications)

Without one of these, a contact-form submission is saved to the database and **nobody is
notified** — Payload writes the message to the server log instead. Set whichever provider you
use; the adapter is chosen from whichever variables are present.

| Variable | For | Notes |
| --- | --- | --- |
| `RESEND_API_KEY` | Resend | Takes priority if set. |
| `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` | Brevo, Postmark, any SMTP | `SMTP_PORT` defaults to 587 (STARTTLS); 465 switches to implicit TLS. |
| `EMAIL_FROM` | both | **Required.** Without it the adapter falls back to console logging and warns. Must be a verified sender. |
| `EMAIL_FROM_NAME` | both | Defaults to "Hause Interiors". |
| `ENQUIRY_NOTIFY_TO` | both | Where enquiries go. Falls back to `EMAIL_FROM`. |

The send is non-blocking: if the provider is down the visitor still gets a success response and
the enquiry is still saved, with the failure logged. Losing a notification is recoverable — the
row is in the admin. Losing the enquiry is not.

### Database — Supabase

Payload has no database of its own; it uses whatever `DATABASE_URI` points at. Supabase is
Postgres, so its tables live in your Supabase project alongside everything else — there is no
second database to manage.

Use the **session pooler** connection string from Supabase → Settings → Database. Payload holds
pooled connections, which suits a long-lived server; on serverless, the transaction pooler
(port 6543) is the safer choice.

```
DATABASE_URI=postgresql://postgres.<ref>:<password>@aws-0-<region>.pooler.supabase.com:5432/postgres
```

The adapter is picked from the string: anything starting `postgres` uses Postgres, otherwise
SQLite. Local development keeps using the SQLite file unless you point it at Supabase too.

**Schema.** `npm run dev` pushes schema changes automatically; that does not happen in
production. Before the first deploy, generate migrations against the same Postgres you will
deploy to and commit them:

```bash
DATABASE_URI=<your postgres url> npx payload migrate:create
DATABASE_URI=<your postgres url> npx payload migrate
```

`NEXT_IMAGE_HOSTS` is an allowlist rather than a wildcard on purpose. `hostname: "**"`
would let anyone hand `/_next/image` an arbitrary URL and have the server fetch it —
an open proxy for laundering requests and burning your bandwidth.

Generate a secret with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 4. Deploy

Push the branch and import the repo in Vercel. Build command and output
directory are the Next.js defaults — nothing to change.

## 5. Create the first admin user

Visit `https://<your-domain>/admin`. The first visit offers to create the first
user. Do this immediately after the first deploy: until a user exists, the
endpoint that creates one is open.

---

## Schema migrations

Payload pushes schema changes automatically in development. In production it
does **not** — a missing column surfaces as a `500` with
`no such column: …` in the logs.

Before deploying a change that adds or alters Payload fields:

```bash
npm run payload migrate:create      # generates a migration from the diff
git add src/migrations && git commit
```

Then add `payload migrate` to the deploy step, or run it once against the
production database.

---

## After deploying — check these

- `/` and the rest of the site render
- `/admin` loads **styled** (if it looks like unstyled HTML, the
  `@payloadcms/next/css` import has been removed from `src/app/(payload)/layout.tsx`)
- Submitting the contact form creates a record under **Enquiries**
- Uploading an image in **Media** returns a `blob.vercel-storage.com` URL,
  not `/uploads/…` — a local path means `BLOB_READ_WRITE_TOKEN` is not set
- `/blog` lists published posts and hides drafts

## Known gaps

- **Enquiries are silent.** A submission is stored but nobody is notified. Add
  an `afterChange` hook on the `enquiries` collection to send an email.
- **No rate limiting on the public enquiry endpoint.** `POST /api/enquiries` is
  open by design so the form can reach it; add a captcha or rate limit before
  it attracts spam.
