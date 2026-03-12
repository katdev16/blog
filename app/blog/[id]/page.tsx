import Link from "next/link";
import { Postdetail } from "@/components/blog/PostDetail/postdetail";

import CommentForm from "./CommentForm";
import { allPosts } from "@/lib/posts";

export default async function PostPage({ params }: { params?: Promise<{ id?: string | string[] }> | { id?: string | string[] } }) {
  const sp = await params;
  const rawId = sp?.id;
  // Debug: print params to server console so dev server shows what Next passes
  // This will appear in the terminal running `npm run dev` when the page renders.
  // Remove this after debugging.
  // eslint-disable-next-line no-console
  console.log("[PostPage] params:", sp);
  const id = Array.isArray(rawId) ? rawId[0] : rawId;
  const post = id ? allPosts.find((p) => p.id === String(id)) : undefined;

  if (!post) return (
    <div className="min-h-screen flex items-center justify-center">
      <div>
        <p className="mb-2">Post not found for id: <strong>{String(id)}</strong></p>
        <p className="text-sm text-zinc-600">Make sure the ID in the URL matches 1–23.</p>
        <pre className="mt-3 p-2 bg-white border rounded text-xs">{JSON.stringify({ params }, null, 2)}</pre>
      </div>
    </div>
  );

  const comments = [
    { id: "c1", author: "Alice", text: "Nice post!" },
    { id: "c2", author: "Bob", text: "Thanks for writing." },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-16">
      <main className="mx-auto max-w-3xl px-6">
        <Link href="/blog" className="text-blue-600">← Back to posts</Link>
        <Postdetail
          id={post.id}
          title={post.title}
          longDescription={post.longDescription}
          imageSrc={post.imageSrc}
        />

        <section>
          <h2 className="text-2xl font-semibold mb-3">Comments</h2>
          <div className="space-y-3 mb-4">
            {comments.map((c) => (
              <div key={c.id} className="p-3 border rounded bg-white">
                <strong className="block">{c.author}</strong>
                <p className="text-zinc-700">{c.text}</p>
              </div>
            ))}
          </div>

          <CommentForm postId={post.id} />
        </section>
      </main>
    </div>
  );
}
