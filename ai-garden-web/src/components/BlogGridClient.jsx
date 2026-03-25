"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export default function BlogGridClient({ posts, initialCount = 12, step = 12 }) {
  const safePosts = useMemo(() => (Array.isArray(posts) ? posts : []), [posts]);
  const [visibleCount, setVisibleCount] = useState(initialCount);

  const visiblePosts = safePosts.slice(0, visibleCount);
  const canLoadMore = visibleCount < safePosts.length;

  return (
    <>
      <section className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visiblePosts.map((post) => (
          <article
            key={post.slug}
            className="h-full rounded-2xl border border-[#34B23D] bg-gradient-to-t from-[#164C1A]/15 to-[#34B23D]/15 p-6"
          >
            {post.image_url ? (
              <div className="mb-4 overflow-hidden rounded-xl border border-[#34B23D]">
                <img
                  src={post.image_url}
                  alt={post.title}
                  loading="lazy"
                  decoding="async"
                  className="h-48 w-full object-cover"
                />
              </div>
            ) : null}

            <p className="text-sm text-gray-600">{post.date}</p>
            <h2 className="mt-2 text-[20px] sm:text-[22px] font-semibold">
              <Link
                href={`/blog/${post.slug}`}
                className="hover:text-blue-600 transition-colors"
              >
                {post.title}
              </Link>
            </h2>
            <p className="mt-3 text-gray-600">{post.excerpt}</p>
            <div className="mt-4">
              <Link
                href={`/blog/${post.slug}`}
                className="text-[#34B23D] hover:text-blue-600 transition-colors"
              >
                Read article
              </Link>
            </div>
          </article>
        ))}
      </section>

      {canLoadMore ? (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((c) => Math.min(c + step, safePosts.length))}
            className="rounded-xl border border-[#2D3845] bg-zinc-900/60 px-6 py-3 text-sm font-medium text-[#1E1E1E] hover:bg-zinc-900 transition-colors"
          >
            Load more
          </button>
        </div>
      ) : null}
    </>
  );
}
