import Link from "next/link";

import CommentForm from "./CommentForm";

const allPosts = Array.from({ length: 23 }).map((_, i) => ({
  id: String(i + 1),
  title: `Post #${i + 1}`,
  body: `This is the full content for post ${i + 1}.`,
}));

export default function PostPage({ params }: { params: { id?: string | string[] } }) {
  const rawId = params?.id;
  // Debug: print params to server console so dev server shows what Next passes
  // This will appear in the terminal running `npm run dev` when the page renders.
  // Remove this after debugging.
  // eslint-disable-next-line no-console
  console.log("[PostPage] params:", params);
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
        <h1 className="text-3xl font-bold mt-4 mb-2 text-black dark:text-zinc-50">{post.title}</h1>
        <article className="prose max-w-none mb-8">{post.body}</article>

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
