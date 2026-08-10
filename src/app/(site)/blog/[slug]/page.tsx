import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedPostBySlug } from "@/lib/posts";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) return { title: "Not found" };
  return {
    title: `${post.title} — Hause Interiors`,
    description: (post.excerpt as string) || undefined,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();

  const cover = post.coverImage as { url?: string; alt?: string } | null;

  return (
    <main className="min-h-screen bg-[#f9f8f6] text-[#18181b] py-28 px-6 sm:px-12 md:px-16">
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
