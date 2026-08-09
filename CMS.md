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
5. **After adding or changing Payload fields, run `npm run dev` once** so the schema is pushed.
6. **After adding a custom admin component, run `npm run generate:importmap`.**
7. **Do not unwrap `withPayload` in `next.config.ts`** and do not remove `"type": "module"`
   from `package.json`. Both are load-bearing — see below.
8. **Verify by rendering, not by reading the diff.** Compare a CMS page against the hard-coded
   one and confirm the CMS content actually appears.

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
