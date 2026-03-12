import { NextResponse } from "next/server";
import { getAllPosts, createPost } from "../../../lib/posts";

export async function GET() {
  try {
    const posts = await getAllPosts();
    return NextResponse.json(posts);
  } catch (err) {
    return NextResponse.json({ error: "Failed to read posts" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body || !body.title) {
      return NextResponse.json({ error: "Missing required field: title" }, { status: 400 });
    }
    const newPost = await createPost(body);
    return NextResponse.json(newPost, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
