// pages/blog.tsx
import { useRouter } from "next/router";
import Link from "next/link";

export default function Page() {
  const router = useRouter();
  const page = Number((router.query.page as string) ?? "1");
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
        <Link
          href={{ pathname: "/blog", query: { page: Math.max(page - 1, 1) } }}
          aria-disabled={page <= 1}
        >
          Previous
        </Link>
        <Link href={{ pathname: "/blog", query: { page: page + 1 } }}>
          Next
        </Link>
      </nav>
    </>
  );
}
``