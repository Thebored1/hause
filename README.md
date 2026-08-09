# Hause Interiors

Next.js 16 (App Router) + React 19, with [Payload CMS](https://payloadcms.com) supplying
content to the site's own components.

```bash
npm install
npm run dev          # http://localhost:3000
```

| Route | What it is |
| --- | --- |
| `/` and the rest of the site | Existing hand-coded pages, unchanged |
| `/admin` | Payload admin — pages, media, users |
| `/cms/[slug]` | CMS-driven pages, rendered with the site's own components |
| `/api/*` | Payload REST (and `/api/graphql`) |

## Working on content editing

**→ Read [`CMS.md`](./CMS.md) first.**

It covers the architecture, the four-step recipe for making an existing component editable,
the rules to follow (including several failures that are silent rather than loud), the content
API, and the gotchas specific to this stack.

The short version: components stay exactly as written and every prop defaults to the copy
already shipped, so hard-coded pages render byte-identically while a CMS page can drive the
same component with stored content. There is only one implementation of each section, so the
CMS and the design cannot drift apart.

## Project layout

```
src/
├─ app/
│  ├─ (site)/        the website — its own root layout
│  └─ (payload)/     Payload admin + API — its own root layout
├─ components/       site components (content-driven, defaults preserved)
├─ blocks/           Payload block configs mirroring component props
├─ collections/      Pages, Media, Users
└─ payload.config.ts
```

Two root layouts is deliberate — a shared one would nest `<html>` and leak the site's
stylesheet into the admin.

## Before deploying

SQLite (`payload.db`) and local uploads don't survive serverless. Swap in
`@payloadcms/db-postgres` plus a storage adapter, and set a real `PAYLOAD_SECRET`.
