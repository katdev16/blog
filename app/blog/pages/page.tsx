// pages/blog.tsx
"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const searchParams = useSearchParams();
  const page = Number(searchParams?.get("page") ?? "1");
  const pageSize = 10;

  const posts = Array.from({ length: pageSize }).map((_, i) => ({
    id: `${page}-${i}`,
    title: `Post ${i + 1} on page ${page}`,
  }));

  return (
    <>
      <h1>Blog</h1>
      <ul>
        {posts.map((p) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>

      <nav style={{ display: "flex", gap: 8 }}>
        <Link href={`/blog?page=${Math.max(page - 1, 1)}`} aria-disabled={page <= 1}>
          Previous
        </Link>
        <Link href={`/blog?page=${page + 1}`}>Next</Link>
      </nav>
    </>
  );
}
