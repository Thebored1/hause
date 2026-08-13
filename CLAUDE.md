@AGENTS.md

# Hause Interiors — project rules

Read `CMS.md` before changing anything content-related, and `DEPLOY.md` before anything that
touches the database. `SEO.md` records what is generated and what is still outstanding.

## Its relationship to nextblocks

`../nextblocks` is the MIT-licensed starter this site's canvas and SEO work came from. The two
are separate repositories with no shared code at build time — changes move by hand, in both
directions, and that is the part to be careful with.

**Mechanism may go back to the starter. This client's content may not.** A block, a helper, a
script or a test is fair game; copy, imagery, the studio address, the telephone number and the
social links are not. Porting a test means rewriting its fixtures, not pasting them — a real
address and phone number reached the starter's public repository exactly that way.

Coming the other way — starter to site — there is nothing to be careful about. Take whatever
is useful.

## Load-bearing, and silent when broken

- **`--webpack` stays on `dev` and `build`.** Under Turbopack the server action Payload declares
  in `(payload)/layout.tsx` is never registered, so adding a block in the admin returns 404 and
  the block renders as an empty skeleton — in production builds too. It compiles cleanly and
  only fails at runtime, so a build passing proves nothing here.
- **Postgres runs with `push: false`.** Adding a field does not create its column. Generate a
  migration and apply it, or every query against that collection fails — which surfaces as the
  whole site 404ing, not as a database error.
- **Use the Supabase transaction pooler (6543).** The session pooler caps at 15 clients and
  holds each for a whole session; serverless exhausts it within a couple of deploys. The direct
  host publishes no IPv4 at all.
- **The connection pool is `max: 5`, deliberately not 1.** Payload holds a connection for a
  transaction while issuing other queries, so a single-connection pool deadlocks until the
  connect timeout fires.
- **`NEXT_PUBLIC_SITE_URL` must be set.** Canonicals and `og:image` have to be absolute; without
  it they fall back to localhost and shared links get no preview card.
- **JSON-LD needs the CSP nonce.** `script-src` applies to every `<script>` element whatever its
  type, so an unsigned `ld+json` block is dropped before a crawler reads it.

## How to verify work here

Rendering, not reading. This project has produced several confident-but-wrong results that only
a real request disproved.

```bash
npm test                                 # 107 tests
npm run seo:audit                        # every URL in sitemap.xml, against a build
npx tsc --noEmit && npx eslint src
```

- **Compare rendered markup**, not source, when changing how a page is produced. Normalise the
  CSP nonce, the `?v=` cache-buster and React's stream id first — they vary per request, and
  ignoring that produces phantom differences.
- **Check a comparison can fail** before trusting it. A markup diff that reports "identical"
  after a real change has usually stopped looking.
- **Mutate the source to check a test bites.** Several tests here passed while covering nothing
  until they were made to fail on purpose.
- The browser pane is often not compositing; `document.hidden` is true and Payload renders field
  bodies lazily, so an admin page can look empty when it is fine. Verify with a real HTTP
  request before believing a screenshot.
