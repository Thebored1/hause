# CMS integration guide

How content editing works in this site, and how to add more of it.

**Read this before writing a block, a collection, or anything under `src/app/(payload)`.**

---

## The one idea

The site's components stay exactly as they are. Payload supplies their **content**.

Nothing re-creates the design in a page builder. `ServicesGrid` renders the services
section on the home page and on a CMS page — same component, same markup, same classes.
The only difference is where its props come from.

```
Hard-coded page   →  <ServicesGrid />                    → props default to shipped copy
CMS page          →  <ServicesGrid {...blockFromPayload} /> → props come from the database
```

This is why CMS pages cannot drift from the design: there is only one implementation.

---

## Layout of the integration

```
src/
├─ payload.config.ts              Payload entry point (collections, db, secret)
├─ collections/
│  ├─ Pages.ts                    title, slug, layout (blocks field)
│  ├─ Media.ts                    uploads → public/uploads
│  └─ Users.ts                    auth
├─ blocks/
│  └─ ServicesGridBlock.ts        Payload fields mirroring ServicesGrid's props
├─ components/
│  └─ ServicesGrid.tsx            the real component — content-driven, defaults preserved
└─ app/
   ├─ (site)/                     the existing website (its own root layout)
   │  └─ cms/[slug]/page.tsx      renders a CMS page by mapping blocks → components
   └─ (payload)/                  Payload admin + REST/GraphQL (its own root layout)
```

Two root layouts is deliberate. A single shared root would nest one `<html>` inside another
and leak the site's stylesheet into Payload's admin.

---

## Adding a new editable component

Four steps. `ServicesGrid` is the worked example — copy its shape.

### 1. Make the component content-driven, defaults unchanged

Every prop defaults to the copy the component already ships, so **existing usage renders
byte-identically** and no existing page needs touching.

```tsx
interface ServicesGridProps {
  eyebrow?: string;
  title?: string;
  services?: ServiceItem[];
  // …
}

export default function ServicesGrid({
  eyebrow = "Services",
  title = "Interior design services that work for the way you live.",
  services = SERVICES,     // the constant that was always there
}: ServicesGridProps) {
```

Then bind the markup to the props — `{eyebrow}`, `{title}`, `{services.map(...)}`.

> **Verify each binding actually landed.** A missed one fails silently: the component keeps
> rendering its defaults and looks correct while ignoring the CMS entirely. Grep for the old
> constant afterwards (`grep -n "SERVICES.map" `) — if it's still there, the CMS data is dead.

### 2. Make every prop serialisable

Anything crossing the database boundary must survive JSON.

| Not allowed | Do this instead |
| --- | --- |
| `icon: Home` (a React component) | `icon: "home"` + an `ICONS` lookup map |
| `onOpenContact: () => void` (required) | make it optional, fall back to a link |
| Imported constants, dates, class instances | plain strings, numbers, arrays, objects |

The callback pattern used here:

```tsx
{onOpenContact ? (
  <button onClick={onOpenContact} className={cls}>{ctaLabel}</button>
) : (
  <Link href={ctaHref} className={`${cls} inline-block`}>{ctaLabel}</Link>
)}
```

The existing page still opens its modal; the server-rendered CMS page gets a working link.

### 3. Write a Payload block mirroring the props

One field per prop, same names. `src/blocks/ServicesGridBlock.ts`:

```ts
import type { Block } from "payload";

export const ServicesGridBlock: Block = {
  slug: "servicesGrid",                       // matches the renderer's case
  labels: { singular: "Services Grid", plural: "Services Grids" },
  fields: [
    { name: "eyebrow", type: "text", defaultValue: "Services" },
    { name: "title", type: "textarea" },
    {
      name: "services",
      type: "array",
      fields: [
        { name: "icon", type: "select", options: ["home", "globe", "sparkles"] },
        { name: "title", type: "text", required: true },
      ],
    },
  ],
};
```

Register it in `src/collections/Pages.ts` under `layout.blocks`.

### 4. Map it in the renderer

`src/app/(site)/cms/[slug]/page.tsx`:

```tsx
case "servicesGrid":
  return <ServicesGrid key={i} eyebrow={block.eyebrow as string} services={block.services as ServiceItem[]} />;
```

### 5. Restart dev once

Adding Payload fields changes the SQLite schema. `next dev` pushes it; `next start` does not
and will return 500s until you have. See *Gotchas*.

---

## Rules for agents

Follow these or the change will silently not work.

1. **Never remove a default.** Defaults are what keep existing pages rendering unchanged.
2. **Block `slug` must equal the renderer's `case`.** A mismatch renders nothing, with no error.
3. **Field names must equal prop names.** The renderer maps them one-to-one on purpose.
4. **No React components, functions or class instances in block fields.** JSON only.
5. **After adding or changing Payload fields, the schema has to catch up.** On SQLite, running
   `npm run dev` once pushes it. On Postgres it does not: `push` is off, so generate a migration
   and apply it — see `DEPLOY.md`. Skipping this is why a field appears to save and then
   everything 404s.
6. **After adding a custom admin component, run `npm run generate:importmap`.**
7. **Do not unwrap `withPayload` in `next.config.ts`** and do not remove `"type": "module"`
   from `package.json`. Both are load-bearing — see below.
8. **Verify by rendering, not by reading the diff.** Load the page and confirm the content
   actually appears. When comparing markup, normalise the CSP nonce, the `?v=` cache-buster and
   React's stream id first — they vary per request — and check the comparison can still fail
   before trusting an "identical".
9. **Give a new page a meta description.** Everything else on the SEO tab falls back sensibly;
   this one falls back to the site default, which is the same sentence on every page.
10. **Run `npm run seo:audit` after adding a route.** It catches a page with no canonical, no
    `<h1>`, or images with no alt text — none of which show up as an error anywhere else.

---

## SEO fields

Pages and posts have an **SEO** tab, from `@payloadcms/plugin-seo` plus three fields this project
adds in `src/fields/seo.ts`:

| Field | What it does |
| --- | --- |
| Meta title, description, keywords | Falls back to the page title and the site description |
| Share image | The picture shown when a link is pasted into WhatsApp, LinkedIn or Slack |
| **Canonical URL** | Only for a page that duplicates another. Validated as absolute — a relative canonical is ignored by crawlers, so it would look set and do nothing |
| **Hide from search engines** | `noindex`, and drops the page from `sitemap.xml` |
| **Share card type** | website or article |
| **What this page is** | page / service / article — adds `Service` or `Article` structured data |

Site-wide identity and the studio's address live in **Site Settings** → Site and Business. The
business details are off by default: a half-filled address counts against you, and Google
cross-checks them against your Business Profile.

`src/lib/metadata.ts` turns the stored fields into tags; `src/lib/structured-data.ts` builds the
JSON-LD graph. Both are pure functions over plain values, because every rule in them is a
fallback chain and fallback chains fail silently — nothing throws when a canonical is relative.

**FAQ structured data is generated from the `faqSection` blocks on the page**, never stored
separately. One copy of each answer means editing it changes what search engines are given; a
second copy would drift the first time somebody edited one and not the other.

Check the result rather than trusting it:

```bash
npm run seo:audit                        # against a local production build
npm run seo:audit https://www.hause.co.in
```

See `SEO.md` for what is generated, what an editor controls, and what is still outstanding.

---

## Working with the content API

Payload's REST API is at `/api`. Auth is a JWT.

```bash
# 1. log in
curl -X POST localhost:3000/api/users/login \
  -H 'content-type: application/json' \
  -d '{"email":"…","password":"…"}'            # → { token }

# 2. create a page made of blocks
curl -X POST localhost:3000/api/pages \
  -H 'content-type: application/json' -H 'Authorization: JWT <token>' \
  -d '{
    "title": "Services",
    "slug": "services-test",
    "layout": [{
      "blockType": "servicesGrid",
      "eyebrow": "Services",
      "title": "Interior design services that work for the way you live.",
      "services": [
        { "id": "01", "icon": "home", "title": "Residential Interior Design",
          "description": "…", "href": "/services/residential-interior-design" }
      ]
    }]
  }'
```

The page renders at `/cms/services-test`.

Other endpoints: `GET /api/pages`, `PATCH /api/pages/:id`, `DELETE /api/pages/:id`,
`POST /api/media` (multipart, field `file`), and GraphQL at `/api/graphql`.

Payload locks a document while it is open in the admin and keeps version history, so an agent
and a person can work on the same page without silently overwriting each other.

---

## Gotchas

Each of these cost real debugging time. They are not optional.

| Symptom | Cause | Fix |
| --- | --- | --- |
| Admin won't compile, `Expected ';' … LICENSE` | `next.config.ts` not wrapped | keep `export default withPayload(nextConfig)` |
| `ERR_REQUIRE_ASYNC_MODULE` from the Payload CLI | project is CommonJS | keep `"type": "module"` in `package.json` |
| Admin renders unstyled, ~21px inputs | Payload's SCSS doesn't compile under Turbopack | keep `import "@payloadcms/next/css"` in `(payload)/layout.tsx` |
| API 500s, `no such column: …` | schema not pushed | run `npm run dev` once, then restart |
| Site stylesheet leaking into the admin | one shared root layout | keep `(site)` and `(payload)` as separate root layouts |
| CMS content ignored, defaults render | a prop binding silently not applied | grep for the old constant in the component |
| Newly added block stays a grey skeleton; `Failed to find Server Action` in the log; `POST /admin/... 404` | **Turbopack does not register the server action** declared in `(payload)/layout.tsx` | keep `--webpack` on `dev` **and** `build` |
| Whole document form read-only, Save greyed out | `next build` was run while `next dev` was running — both write `.next/` | stop the server, `rm -rf .next`, restart |

### Why this project does not use Turbopack

Next 16 defaults to Turbopack for both `dev` and `build`. Under Turbopack the
server action that Payload declares in `(payload)/layout.tsx` is never registered,
so the `POST` the admin makes to fetch a newly added block's fields returns 404:

```
Error: Failed to find Server Action "40230ceb07…". This request might be from an older or newer deployment.
POST /admin/collections/pages/17 404
```

The block then renders as an empty skeleton for ever. It affects **every** block,
not just the canvas, and it affects the **production build too** — so a Turbopack
build ships an admin where nobody can add a block. `next build --webpack` and
`next dev --webpack` both work.

`dev:turbo` and `build:turbo` are kept so this can be retested against a future
Next release. Verify by adding a block and checking it renders its fields; do not
switch back on a clean compile alone, because Turbopack compiles fine — it fails
at runtime.

---

## Security

What is in place:

| | |
| --- | --- |
| Canvas rich text | Sanitised on write (a `beforeChange` scrub on the canvas field) **and** on render, so rows stored before the scrub existed cannot execute either |
| Drafts | Private — anonymous reads of Pages and Posts are restricted to `_status: published`, and every query filters explicitly because the local API runs with `overrideAccess: true` and bypasses collection rules |
| Enquiries | Public create for the form; read, update and delete need a login. Rate limited to 5 per address per 10 minutes |
| CSP | Nonce-based `script-src` with `strict-dynamic` on `/`, `/cms/*` and `/blog/*` — the routes that render stored content — minted per request in `src/proxy.ts` |
| Headers | nosniff, Referrer-Policy, Permissions-Policy, HSTS, `frame-ancestors 'self'` |
| Images | Remote hosts allowlisted via `NEXT_IMAGE_HOSTS`, never wildcarded |
| Secret | `PAYLOAD_SECRET` throws in production rather than falling back to a dev value |
| Uploads | `image/*` only; writes require authentication |

Where the edges are:

- **`style-src` still allows `'unsafe-inline'`.** A nonce authorises a `<style>` element but not
  a `style="…"` attribute, and the block views set inline style attributes throughout — that is
  how the canvas expresses colour and layout. Script execution is what stored XSS needs, and
  `script-src` is strict.
- **The CSP does not cover the static pages or `/admin`.** A nonce forces dynamic rendering, and
  the hand-written pages contain no stored content, so they stay static on the baseline headers.
  The admin is Payload's own app, behind a login. If you add a route that renders stored content,
  add it to the matcher in `src/proxy.ts`.
- **Rate limiting is in-process memory.** Counters reset on deploy and each instance keeps its
  own, so the effective limit is `5 × instances`. It stops a script hammering the form; it is not
  a defence against a distributed flood. Moving it to Redis means replacing one function in
  `src/lib/rate-limit.ts`. If your platform forwards neither `x-forwarded-for` nor `x-real-ip`,
  every visitor collapses into one bucket and real users start seeing 429s.
- **`npm audit` reports transitive advisories** via `@payloadcms/db-*` → `drizzle-kit` →
  `@esbuild-kit/esm-loader`. Build-time tooling, not runtime, and not resolvable without an
  upstream Payload bump.

---

## Local setup

```bash
npm install
npm run dev          # http://localhost:3000
```

`.env` (gitignored):

```
PAYLOAD_SECRET=<long random string>   # required in production; signs session tokens
DATABASE_URI=file:./payload.db
```

Admin is at `/admin`. The first visit offers to create the first user.

**Before deploying:** SQLite and local file uploads do not survive serverless. Swap
`@payloadcms/db-sqlite` for `@payloadcms/db-postgres` and add a storage adapter such as
`@payloadcms/storage-vercel-blob`, and set a real `PAYLOAD_SECRET`.
