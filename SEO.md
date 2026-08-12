# SEO

**Site**: Hause Interiors · `https://www.hause.co.in`
**Stack**: Next.js 16.3 (App Router), Payload 3.87, Supabase Postgres

Everything below was checked against a production build, not read off the source.
Re-run it yourself at any time:

```bash
npm run seo:audit                        # against a local production build
npm run seo:audit https://www.hause.co.in
```

The checker fetches every URL in `sitemap.xml` and inspects the HTML a crawler actually
receives. It exits non-zero on a failure, so it can gate a deploy.

**Last run: 16 pages, 0 failures, 22 warnings.** Every remaining warning is content or a
missing upload — listed at the bottom, with what to do about each.

---

## What an editor controls

All of it lives in the CMS. Nothing here needs a developer.

| Where | What |
| --- | --- |
| Page or post → **SEO** tab | Meta title, description, share image, canonical, noindex, share-card type, and what the page *is* (page / service / article) |
| **Site Settings** → Site | Site name, default description, default share image, social profile URLs |
| **Site Settings** → Business | Address, coordinates, phone, hours, price range, areas served |

The SEO tab shows live character counts and a preview of how the result will look in Google.

---

## Crawling and indexing

| | |
| --- | --- |
| `robots.txt` | Generated. Allows everything, disallows `/admin` and `/api`, points at the sitemap |
| `sitemap.xml` | Generated **per request** from the database, so a page published in the CMS appears without a deploy |
| Drafts | Excluded from the sitemap by the query |
| `noindex` pages | Excluded from the sitemap too — listing a page you are asking crawlers to skip is a contradiction Search Console reports as an error |
| `lastModified` | Real edit times, so a crawler can tell what changed instead of being told everything changed on every deploy |
| `/admin`, `/api` | `X-Robots-Tag: noindex, nofollow`. robots.txt only *asks*; a disallowed URL can still be indexed from a link elsewhere |

Sitemap coverage is 16 URLs: 15 CMS pages plus the journal index, and every published post.

`priority` and `changeFrequency` are derived from the slug rather than being editable. A
number nobody can feel the effect of gets set once, forgotten, and then quietly contradicts
the site as it grows.

---

## Metadata

Every page emits a title, description, absolute canonical, Open Graph tags, a Twitter card and
an explicit robots directive. Verified on `/faqs`:

```html
<meta name="description" content="Answers to common questions about interior design costs…"/>
<link rel="canonical" href="https://www.hause.co.in/faqs"/>
<meta property="og:title" content="Frequently Asked Questions | Hause Interiors Delhi NCR"/>
<meta property="og:url" content="https://www.hause.co.in/faqs"/>
<meta name="robots" content="index, follow"/>
```

Rules worth knowing, because each one is a silent failure if it goes wrong:

- **Canonicals and share images are always absolute.** A crawler resolving `og:image` has no
  page context, so a relative URL is dropped without complaint.
- **`og:url` follows the canonical**, not the page's own address — so a duplicated page points
  at the original in both places.
- **`noindex` renders `noindex, follow`**: the page leaves the index but its links keep passing
  value to pages that are in it.
- **A missing page returns `noindex`** rather than inheriting the site defaults and advertising
  a 404 as a real page.
- **The Twitter card drops to `summary`** when there is no image, because `summary_large_image`
  with nothing to show renders worse than the small card.

`trailingSlash: false` keeps one canonical shape per URL, so `/about` and `/about/` cannot
compete for the same content.

---

## Structured data

One `@graph` per page with stable `@id` anchors, so nodes reference each other instead of
repeating themselves — the WebSite points at `#organization` rather than restating it.

| Node | Where | Source |
| --- | --- | --- |
| `WebSite`, `Organization` | Every page | Site Settings |
| `BreadcrumbList` | Every page below the home page | Slug depth |
| `FAQPage` | Any page with an FAQ block | **The questions on the page** |
| `Service` | Pages marked as a service | The page, plus areas served |
| `Article` | Every post | Post, dated from `publishedAt` |

Two decisions that keep this honest:

**FAQ schema is generated from the FAQ blocks themselves.** There is one copy of each answer,
so editing it changes what Google is given. A separate SEO field would drift the first time
someone edited one and not the other — and schema disagreeing with the visible page is exactly
what gets rich results withdrawn. The audit script re-checks this on every run: it fails if a
question in the schema is not present in the page text.

**Breadcrumbs only link ancestors that exist.** `services/x` yields *Home → X* when there is no
`/services` page, rather than a crumb pointing at a 404.

Verified on `/faqs`: `WebSite`, `Organization`, `BreadcrumbList`, `FAQPage` with all 8 questions,
each confirmed present in the page text.

---

## Performance and security headers

| | |
| --- | --- |
| Images | AVIF, then WebP, then the original. On a photography-led site images are most of what Largest Contentful Paint measures |
| Remote images | Allowlisted by host, never `**` — a wildcard turns `/_next/image` into an open proxy |
| CSP | Nonce-based `script-src` with `strict-dynamic`, minted per request |
| Headers | HSTS, `nosniff`, `Referrer-Policy`, `Permissions-Policy`, `frame-ancestors 'self'` |

JSON-LD scripts carry the CSP nonce. `script-src` applies to every `<script>` element whatever
its type, so an unsigned block would be dropped before a crawler read it.

---

## Outstanding — and who can do it

**Only you can do these. They are the difference between correct markup and actually ranking.**

1. **Upload a default share image.** Site Settings → Site → Default share image. 1200×630, under
   ~300 KB, text large or absent. **This is the one gap affecting every page**: without it,
   links shared to WhatsApp, LinkedIn or Slack render with no preview card at all. One upload
   fixes all 16 pages.

2. **Fill in the business details and switch them on.** Site Settings → Business needs
   coordinates (Google Maps → right-click your pin), opening hours, and social profile URLs.
   It is off by default because a half-filled address is treated as a quality problem. These are
   cross-checked against your Google Business Profile, so they must match it exactly — and if you
   do not have a Business Profile yet, that is worth more than any tag on this page for a local
   studio.

3. **Shorten 6 fields.** Google truncates titles near 60 characters and descriptions near 155:

   | Page | Field | Now |
   | --- | --- | --- |
   | `/services/commercial-office-interior-design` | title | 73 |
   | `/locations` | title | 71 |
   | `/services/modular-kitchen-wardrobe-design` | title | 68 |
   | `/services/modular-kitchen-wardrobe-design` | description | 198 |
   | `/about` | description | 193 |
   | `/` | description | 172 |

   The counts are shown live in the SEO tab as you type.

4. **Submit the sitemap** to Google Search Console and Bing Webmaster Tools:
   `https://www.hause.co.in/sitemap.xml`. Nothing gets indexed on a schedule you control until
   you do, and Search Console is where you would see any of this going wrong.

---

## What was deliberately left out

- **hreflang.** Single-language site. A self-referential hreflang tag says nothing — it looks
  like SEO without doing any.
- **301 redirects.** New site, no old URLs, so there is no link equity to preserve. Worth adding
  the day a URL changes.
- **Per-page sitemap priority as a CMS field.** Derived instead, for the reason given above.
