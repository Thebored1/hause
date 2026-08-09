import Link from "next/link";
import type { Metadata } from "next";
import { getPayload } from "payload";
import config from "@payload-config";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Journal — Hause Interiors",
  description: "Notes on interior design, materials and delivering spaces that last.",
};

export default async function BlogIndex() {
  const payload = await getPayload({ config });

  // Access control on the collection already hides drafts from the
  // public, so this returns published posts only.
  const { docs } = await payload.find({
    collection: "posts",
    sort: "-publishedAt",
    limit: 50,
    depth: 1,
  });

  return (
    <main className="min-h-screen bg-[#f9f8f6] text-[#18181b] py-28 px-6 sm:px-12 md:px-16">
      <div className="max-w-[1280px] mx-auto">
        <span className="text-xs font-semibold tracking-[0.22em] text-[#8a8578] uppercase">
          Journal
        </span>
        <h1 className="mt-4 text-3xl sm:text-4xl md:text-[44px] font-normal tracking-[-0.03em] leading-[1.12] max-w-[620px]">
          Notes on design, materials and delivery.
        </h1>

        {docs.length === 0 ? (
          <p className="mt-12 text-sm text-[#6b6559]">
            No posts published yet.
          </p>
        ) : (
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
            {docs.map((post) => {
              const cover = post.coverImage as { url?: string; alt?: string } | null;
              return (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col gap-4"
                >
                  <div className="rounded-3xl overflow-hidden bg-black/5 aspect-[4/3]">
                    {cover?.url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={cover.url}
                        alt={cover.alt ?? ""}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : null}
                  </div>
                  <div>
                    {post.publishedAt ? (
                      <time className="text-xs tracking-[0.18em] text-[#a19c8f] uppercase">
                        {new Date(post.publishedAt as string).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </time>
                    ) : null}
                    <h2 className="mt-2 text-xl font-medium tracking-[-0.02em] leading-snug">
                      {post.title}
                    </h2>
                    {post.excerpt ? (
                      <p className="mt-2 text-sm text-[#6b6559] leading-[1.7]">{post.excerpt}</p>
                    ) : null}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
