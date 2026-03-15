import { NextResponse } from "next/server";
import { getAllPosts } from "../../../../lib/posts";

export async function GET() {
  try {
    const posts = await getAllPosts();
    return NextResponse.json({ count: posts.length, ids: posts.map(p => p.id).slice(0, 200) });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('GET /api/debug/posts error:', err);
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: `Failed to read posts: ${msg}` }, { status: 500 });
  }
}
