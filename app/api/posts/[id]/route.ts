import { NextResponse } from "next/server";
import { getPostById, updatePost, deletePost } from "../../../../lib/posts";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const post = await getPostById(id);
    if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });
    return NextResponse.json(post);
  } catch (err) {
    console.error('GET /api/posts/[id] error:', err);
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: `Failed to read post: ${msg}` }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await req.json();
    const updated = await updatePost(id, body);
    if (!updated) return NextResponse.json({ error: "Post not found" }, { status: 404 });
    return NextResponse.json(updated);
  } catch (err) {
    console.error('PUT /api/posts/[id] error:', err);
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: `Failed to update post: ${msg}` }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  return PUT(req, { params });
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    // Debug: log the incoming id and existing posts
    // eslint-disable-next-line no-console
    console.log('DELETE /api/posts/[id] received id:', id);
    try {
      const all = await (await import('../../../../lib/posts')).getAllPosts();
      // eslint-disable-next-line no-console
      console.log('DELETE /api/posts existing ids (first 20):', all.map((p: any) => p.id).slice(0, 20));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Error reading posts for debug:', e);
    }

    const ok = await deletePost(id);
    console.log("id: "+ id);
    console.log("ok: "+ ok);
    if (!ok) return NextResponse.json({ error: "Post not found", receivedId: id }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('DELETE /api/posts/[id] error:', err);
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: `Failed to delete post: ${msg}` }, { status: 500 });
  }
}
