import Link from "next/link";
import { Postdetail } from "@/components/blog/PostDetail/postdetail";

import CommentForm from "./CommentForm";

// Force this App Router page to be server-rendered on every request (SSR)
export const dynamic = 'force-dynamic';

export default async function PostPage({ params }: { params?: Promise<{ id?: string | string[] }> | { id?: string | string[] } }) {
  const sp = await params;
  const rawId = sp?.id;
  // Debug: print params to server console so dev server shows what Next passes
  // This will appear in the terminal running `npm run dev` when the page renders.
  // Remove this after debugging.
  // eslint-disable-next-line no-console
  console.log("[PostPage] params:", sp);
  const id = Array.isArray(rawId) ? rawId[0] : rawId;
  let post: any | undefined = undefined;
  if (id) {
    try {
      const res = await fetch(`https://dummyjson.com/posts/${encodeURIComponent(String(id))}`);
      if (res.ok) {
        const data = await res.json();
        post = {
          id: String(data.id),
          title: data.title,
          shortDescription: data.body?.slice(0, 60) ?? '',
          longDescription: data.body ?? '',
          imageSrc: data.image ?? '/images.jpg',
        };
      } else {
        // eslint-disable-next-line no-console
        console.warn('[PostPage] external fetch returned', res.status);
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('[PostPage] failed to fetch external post', e);
    }
  }

  if (!post) return (
    <div className="min-h-screen flex items-center justify-center">
      <div>
        <p className="mb-2">Post not found for id: <strong>{String(id)}</strong></p>
    
        
      </div>
    </div>
  );

  // Fetch comments for this post from dummyjson and normalize shape
  let comments: Array<{ id: string; author: string; text: string }> = [];
  if (id) {
    try {
      const cRes = await fetch(`https://dummyjson.com/posts/${encodeURIComponent(String(id))}/comments`);
      if (cRes.ok) {
        const cData = await cRes.json();
        // dummyjson returns { comments: [...], total, skip, limit }
        comments = (cData.comments || []).map((c: any) => ({
          id: String(c.id),
          author: c.user?.fullName || c.user?.username || `user_${c.user?.id ?? 'anon'}`,
          text: c.body ?? String(c.text ?? ''),
        }));
      } else {
        // eslint-disable-next-line no-console
        console.warn('[PostPage] comments fetch returned', cRes.status);
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('[PostPage] failed to fetch comments', e);
    }
  }

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
