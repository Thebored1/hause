import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedPostBySlug } from "@/lib/posts";
import { buildMetadata } from "@/lib/metadata";
import { metaOf } from "@/lib/page-meta";
import { getSeoSettings } from "@/lib/seo-settings";
import { buildGraph } from "@/lib/structured-data";
import { headers } from "next/headers";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [post, seo] = await Promise.all([getPublishedPostBySlug(slug), getSeoSettings()]);
  if (!post) return { title: "Not found", robots: { index: false, follow: false } };

  const meta = metaOf(post);
  return buildMetadata(
    {
      title: String(post.title ?? ""),
      // Posts live under /blog, so the canonical has to carry the prefix the
      // slug alone does not.
      slug: `blog/${String(post.slug ?? "")}`,
      meta: {
        ...meta,
        // A post's excerpt is already a summary written for a reader; it is a
        // better description than anything derived from the body.
        description: meta.description || String(post.excerpt ?? ""),
        image: meta.image || coverUrl(post),
        // A post is an article whatever the SEO tab says, and the share card
        // should say so.
        ogType: "article",
      },
    },
    { name: seo.site.name, description: seo.site.description, defaultImage: seo.site.defaultImage },
  );
}

/** The cover image, when it was populated rather than left as an id. */
function coverUrl(post: { coverImage?: unknown }): string {
  const cover = post.coverImage;
  return cover && typeof cover === "object" ? String((cover as { url?: unknown }).url ?? "") : "";
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const [post, seo, nonce] = await Promise.all([
    getPublishedPostBySlug(slug),
    getSeoSettings(),
    headers().then((h) => h.get("x-nonce") ?? undefined),
  ]);
  if (!post) notFound();

  const cover = post.coverImage as { url?: string; alt?: string } | null;

  const graph = buildGraph({
    settings: seo,
    slug: `blog/${String(post.slug ?? "")}`,
    pageTitle: String(post.title ?? ""),
    // "blog" exists as a real page, so the trail can link it.
    knownSlugs: ["blog"],
    // Always an Article, whatever the SEO tab says: that is what a post is.
    schemaType: "article",
    page: {
      description: metaOf(post).description || String(post.excerpt ?? ""),
      image: metaOf(post).image || coverUrl(post),
      // publishedAt is the date the studio chose; createdAt is when the row
      // happened to be written, which is not the same thing.
      createdAt: String(post.publishedAt ?? post.createdAt ?? ""),
      updatedAt: String(post.updatedAt ?? ""),
    },
  });

  return (
    <main className="min-h-screen bg-[#f9f8f6] text-[#18181b] py-28 px-6 sm:px-12 md:px-16">
      {/* Nonce-signed: an unsigned ld+json block is dropped by the CSP. */}
      <script
        type="application/ld+json"
        nonce={nonce}
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />
      <article className="max-w-[760px] mx-auto">
        <Link href="/blog" className="text-xs tracking-[0.18em] text-[#a19c8f] uppercase hover:text-[#18181b]">
          ← Journal
        </Link>

        <h1 className="mt-6 text-3xl sm:text-4xl md:text-[44px] font-normal tracking-[-0.03em] leading-[1.12]">
          {post.title}
        </h1>

        <div className="mt-3 flex items-center gap-3 text-xs tracking-[0.18em] text-[#a19c8f] uppercase">
          {post.publishedAt ? (
            <time>
              {new Date(post.publishedAt as string).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          ) : null}
          {post.author ? <span>· {post.author as string}</span> : null}
        </div>

        {cover?.url ? (
          <div className="mt-10 rounded-3xl overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={cover.url} alt={cover.alt ?? ""} className="w-full h-auto" />
          </div>
        ) : null}

        {post.content ? (
          <div className="nb-prose mt-10 text-[17px] leading-[1.75] text-[#3f3b34]">
            <RichText data={post.content as SerializedEditorState} />
          </div>
        ) : null}
      </article>
    </main>
  );
}
