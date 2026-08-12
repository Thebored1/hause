// On-page SEO check against a running site.
//
//   node scripts/seo-audit.mjs http://localhost:3000
//   node scripts/seo-audit.mjs https://www.hause.co.in
//
// Fetches every URL in sitemap.xml and checks the things that are invisible
// until they cost you: a page with no <h1> or several, images with no alt
// text, a missing description or canonical, a share card that will render
// blank, and structured data that fails to parse.
//
// Deliberately reads the rendered HTML rather than the source. These are
// properties of what a crawler receives, and the whole point is to catch the
// case where the code looks right and the output is not.
//
// Exits non-zero if anything failed, so it can gate a deploy.

const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/+$/, "");

const problems = [];
const note = (url, level, message) => problems.push({ url, level, message });

async function get(url) {
  const res = await fetch(url, { redirect: "follow" });
  return { status: res.status, html: await res.text() };
}

function textOf(html) {
  return html.replace(/<[^>]+>/g, " ");
}

async function checkPage(url) {
  const { status, html } = await get(url);
  if (status !== 200) {
    note(url, "fail", `returned ${status}`);
    return;
  }

  // --- headings ---------------------------------------------------------
  const h1s = html.match(/<h1[\s>]/gi) ?? [];
  if (h1s.length === 0) note(url, "fail", "no <h1>");
  else if (h1s.length > 1) note(url, "warn", `${h1s.length} <h1> elements — should be one`);

  // --- images -----------------------------------------------------------
  const imgs = html.match(/<img\b[^>]*>/gi) ?? [];
  const noAlt = imgs.filter((tag) => !/\salt\s*=/i.test(tag));
  const emptyAlt = imgs.filter((tag) => /\salt\s*=\s*(""|'')/i.test(tag));
  if (noAlt.length) note(url, "fail", `${noAlt.length} of ${imgs.length} images have no alt attribute`);
  // Empty alt is correct for decoration, so it is worth seeing but not failing.
  if (emptyAlt.length) note(url, "info", `${emptyAlt.length} images have empty alt (decorative)`);

  // --- metadata ---------------------------------------------------------
  const title = html.match(/<title[^>]*>(.*?)<\/title>/is)?.[1]?.trim();
  if (!title) note(url, "fail", "no <title>");
  else if (title.length > 65) note(url, "warn", `title is ${title.length} chars — truncated near 60`);

  const description = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1];
  if (!description) note(url, "fail", "no meta description");
  else if (description.length > 165)
    note(url, "warn", `description is ${description.length} chars — truncated near 155`);

  const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i)?.[1];
  if (!canonical) note(url, "fail", "no canonical");
  else if (!/^https?:\/\//.test(canonical)) note(url, "fail", `canonical is not absolute: ${canonical}`);

  // --- share card -------------------------------------------------------
  const ogImage = html.match(/<meta\s+property="og:image"\s+content="([^"]*)"/i)?.[1];
  if (!ogImage) note(url, "warn", "no og:image — shared links will have no preview card");
  else if (!/^https?:\/\//.test(ogImage)) note(url, "fail", `og:image is not absolute: ${ogImage}`);

  // --- structured data --------------------------------------------------
  const ld = html.match(/<script type="application\/ld\+json"[^>]*>(.*?)<\/script>/is)?.[1];
  if (!ld) note(url, "warn", "no structured data");
  else {
    try {
      const graph = JSON.parse(ld)["@graph"] ?? [];
      // Schema that disagrees with the page is worse than none, so check the
      // questions actually appear in the text.
      const faq = graph.find((n) => n["@type"] === "FAQPage");
      if (faq) {
        const text = textOf(html);
        const missing = (faq.mainEntity ?? []).filter((q) => !text.includes(q.name));
        if (missing.length)
          note(url, "fail", `${missing.length} FAQ questions in schema are not on the page`);
      }
    } catch {
      note(url, "fail", "structured data is not valid JSON");
    }
  }
}

// ---------------------------------------------------------------------------

const sitemap = await get(`${base}/sitemap.xml`);
if (sitemap.status !== 200) {
  console.error(`sitemap.xml returned ${sitemap.status} — nothing to check`);
  process.exit(1);
}

const urls = [...sitemap.html.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
console.log(`checking ${urls.length} URLs from sitemap.xml\n`);

for (const url of urls) {
  // The sitemap carries public URLs; check whichever host was asked for.
  await checkPage(url.replace(/^https?:\/\/[^/]+/, base));
}

const fails = problems.filter((p) => p.level === "fail");
const warns = problems.filter((p) => p.level === "warn");
const infos = problems.filter((p) => p.level === "info");

for (const group of [fails, warns, infos]) {
  for (const p of group) {
    const tag = p.level === "fail" ? "FAIL" : p.level === "warn" ? "warn" : "note";
    console.log(`${tag}  ${p.url.replace(base, "") || "/"}  ${p.message}`);
  }
}

console.log(
  `\n${urls.length} pages — ${fails.length} failures, ${warns.length} warnings, ${infos.length} notes`,
);
process.exit(fails.length ? 1 : 0);
