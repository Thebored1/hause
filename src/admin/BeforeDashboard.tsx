import React from "react";
import Link from "next/link";
import { getPayload } from "payload";
import config from "@/payload.config";

/**
 * A header for the dashboard.
 *
 * The stock dashboard opens on a grid of collection names, which says what
 * exists but nothing about the state of the site. This answers the questions
 * someone actually arrives with: is anything waiting for me, and where do I go
 * to change the thing I came to change.
 *
 * Server component, so the counts are real rather than fetched on the client
 * and flashed in. Two cheap count queries.
 */
export default async function BeforeDashboard() {
  const payload = await getPayload({ config });

  const [pages, posts, newEnquiries, media] = await Promise.all([
    payload.count({ collection: "pages" }),
    payload.count({ collection: "posts" }),
    payload.count({ collection: "enquiries", where: { status: { equals: "new" } } }),
    payload.count({ collection: "media" }),
  ]).catch(() => [null, null, null, null] as const);

  const stats = [
    { label: "Pages", value: pages?.totalDocs, href: "/admin/collections/pages" },
    { label: "Posts", value: posts?.totalDocs, href: "/admin/collections/posts" },
    {
      label: "New enquiries",
      value: newEnquiries?.totalDocs,
      href: "/admin/collections/enquiries?where[status][equals]=new",
      // The one number worth noticing on arrival.
      highlight: (newEnquiries?.totalDocs ?? 0) > 0,
    },
    { label: "Media", value: media?.totalDocs, href: "/admin/collections/media" },
  ];

  return (
    <div className="hause-welcome">
      <div className="hause-welcome__head">
        <span className="hause-welcome__eyebrow">Hause Interiors</span>
        <h1 className="hause-welcome__title">Content studio</h1>
        <p className="hause-welcome__sub">
          Every page of the site is edited here. Changes are live as soon as the page is
          published.
        </p>
      </div>

      <ul className="hause-welcome__stats">
        {stats.map((stat) => (
          <li key={stat.label}>
            <Link
              className={`hause-stat${stat.highlight ? " hause-stat--alert" : ""}`}
              href={stat.href}
            >
              <span className="hause-stat__value">{stat.value ?? "—"}</span>
              <span className="hause-stat__label">{stat.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="hause-welcome__actions">
        {/* The live site, deliberately in a new tab so the editor keeps their
            place in the admin. */}
        <a className="hause-action hause-action--primary" href="/" target="_blank" rel="noreferrer">
          View the site
        </a>
        <Link className="hause-action" href="/admin/collections/pages?where[slug][equals]=home">
          Edit the homepage
        </Link>
        <Link className="hause-action" href="/admin/globals/site-settings">
          Nav &amp; footer
        </Link>
      </div>
    </div>
  );
}
