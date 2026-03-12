import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";

export type Post = {
  id: string;
  title: string;
  shortDescription?: string;
  imageSrc?: string;
  longDescription?: string;
};

const postsPath = path.join(process.cwd(), "lib", "posts.json");

function readPostsSync(): Post[] {
  try {
    const raw = fs.readFileSync(postsPath, "utf8");
    return JSON.parse(raw) as Post[];
  } catch (err) {
    return [];
  }
}

export const allPosts: Post[] = readPostsSync();

export async function getAllPosts(): Promise<Post[]> {
  const raw = await fsPromises.readFile(postsPath, "utf8");
  return JSON.parse(raw) as Post[];
}

export async function getPostById(id: string): Promise<Post | undefined> {
  const posts = await getAllPosts();
  return posts.find((p) => p.id === id);
}

export async function createPost(data: Partial<Post>): Promise<Post> {
  const posts = await getAllPosts();
  // simple id generator
  const id = String(Date.now());
  const newPost: Post = {
    id,
    title: data.title ?? "Untitled",
    shortDescription: data.shortDescription ?? "",
    imageSrc: data.imageSrc ?? "/images.jpg",
    longDescription: data.longDescription ?? "",
  };
  posts.unshift(newPost);
  await fsPromises.writeFile(postsPath, JSON.stringify(posts, null, 2), "utf8");
  return newPost;
}

export async function updatePost(id: string, data: Partial<Post>): Promise<Post | null> {
  const posts = await getAllPosts();
  const idx = posts.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  const updated = { ...posts[idx], ...data };
  posts[idx] = updated;
  await fsPromises.writeFile(postsPath, JSON.stringify(posts, null, 2), "utf8");
  return updated;
}

export async function deletePost(id: string): Promise<boolean> {
  const posts = await getAllPosts();
  const filtered = posts.filter((p) => p.id !== id);
  if (filtered.length === posts.length) return false;
  await fsPromises.writeFile(postsPath, JSON.stringify(filtered, null, 2), "utf8");
  return true;
}

export default allPosts;
