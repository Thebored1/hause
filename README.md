# Hause Interiors

Next.js 16 (App Router) + React 19, with [Payload CMS](https://payloadcms.com) supplying
content to the site's own components.

```bash
npm install
npm run dev          # http://localhost:3000
```

| Route | What it is |
| --- | --- |
| `/` and the rest of the site | Hand-coded pages — **not yet in the CMS** |
| `/blog`, `/blog/[slug]` | Blog, from Payload |
| `/cms/[slug]` | CMS-driven pages, rendered with the site's own components |
| `/admin` | Payload admin — pages, posts, enquiries, media, users |
| `/api/*` | Payload REST (and `/api/graphql`) |

## Current state — read this before promising anyone an editable site

Editable in the admin today: **blog posts**, **enquiries**, and **CMS pages** at `/cms/[slug]`.

**The 17 hand-coded site pages are not editable.** Their content lives in `.tsx` files.
Making them editable means converting each section component to be content-driven, giving it
a Payload block, and pointing the route at the CMS. `ServicesGrid` is done as the worked
example; the rest are not.

Roughly 1–2 hours per component. See [`CMS.md`](./CMS.md) for the recipe.

| Component | Status |
| --- | --- |
| `ServicesGrid` | Content-driven, has a block, renders from the CMS |
| `ProcessTimeline`, `WhyUs`, `LocationsGrid` | Partly — content still in `const` arrays in the file |
| `HeroSpaceSwitcher`, `PortfolioShowcase`, `CTASection`, `Footer` | Fully hard-coded |

Worth deciding rather than assuming: pages that rarely change (e.g. `/safety-compliance`) are
arguably fine left in code. A CMS-for-marketing-pages, code-for-the-rest split is normal.

## Documentation

| File | What it covers |
| --- | --- |
| [`CMS.md`](./CMS.md) | Architecture, the recipe for making a component editable, rules for agents, the content API, gotchas |
| [`DEPLOY.md`](./DEPLOY.md) | Vercel deployment — Postgres, Blob storage, env vars, migrations |

The short version of the architecture: components stay exactly as written and every prop
defaults to the copy already shipped, so hard-coded pages render byte-identically while a CMS
page can drive the same component with stored content. There is only one implementation of
each section, so the CMS and the design cannot drift apart.

## Project layout

```
src/
├─ app/
│  ├─ (site)/        the website — its own root layout
│  └─ (payload)/     Payload admin + API — its own root layout
├─ components/       site components (content-driven, defaults preserved)
├─ blocks/           Payload block configs + the canvas block primitives
├─ editor/           drag-and-drop canvas mounted inside the admin
├─ render/           RenderTree — renders canvas JSON on the server
├─ collections/      Pages, Posts, Enquiries, Media, Users
└─ payload.config.ts
```

Two root layouts is deliberate — a shared one would nest `<html>` and leak the site's
stylesheet into the admin.

## Starting a *new* project — don't repeat this build

Most of what was hand-written here already exists as official Payload scaffolding. For a new
site, start from the template instead:

```bash
npx create-payload-app@3.87.1     # choose the website template
```

That ships with a Pages collection using a blocks field, starter blocks, the block renderer,
drafts and live preview, and the admin — i.e. `payload.config.ts`, the `(payload)` route group
and the renderer are all pre-solved.

Then add the official plugins rather than hand-rolling equivalents:

| Plugin | Replaces |
| --- | --- |
| `@payloadcms/plugin-form-builder` | the hand-rolled `Enquiries` collection and form wiring |
| `@payloadcms/plugin-seo` | per-page meta fields |
| `@payloadcms/plugin-redirects` | redirect management |
| `@payloadcms/plugin-search` | site search |
| `@payloadcms/plugin-nested-docs` | parent/child pages and breadcrumbs |

**The expensive part is never Payload — it is retrofitting.** This site had its content baked
into `.tsx` files, so every component has to be unpicked. Build blocks-first and that cost
disappears: you write the same React components, and define their props as a Payload block at
the same time.

```
Retrofitting an existing site   →  1–2 hours per component, plus seeding content
Building CMS-first              →  ~15 minutes per block on top of writing the component
```

What stays project-specific either way: **your blocks**. A hero for an interiors studio is not
a hero for a SaaS product. The template gives you the machinery, not the design.

`CMS.md` still applies to a template-based project — the recipe and the gotchas
(`"type": "module"`, `withPayload`, the admin CSS import, schema pushes in production) are the
same. The template pre-solves the scaffolding, not the workflow.

## Before deploying

See [`DEPLOY.md`](./DEPLOY.md). In short: SQLite and local uploads don't survive serverless, so
set `DATABASE_URI` to a `postgres://` URL and connect a Blob store — the config switches
adapters automatically. Set a real `PAYLOAD_SECRET`; the build fails without one in production.
