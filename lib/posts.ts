// Server-only posts helper (dynamic imports to avoid client-side bundling of Node APIs)
export type Post = {
  id: string;
  title: string;
  shortDescription?: string;
  imageSrc?: string;
  longDescription?: string;
};

const postsPath = process.cwd() + '/lib/posts.json';

async function readJsonFile(): Promise<Post[]> {
  const fs = await import('fs');
  const fsPromises = fs.promises;
  const raw = await fsPromises.readFile(postsPath, 'utf8');
  return JSON.parse(raw) as Post[];
}

export async function getAllPosts(): Promise<Post[]> {
  return readJsonFile();
}

export async function getPostById(id: string): Promise<Post | undefined> {
  const posts = await getAllPosts();
  const needle = id?.toString().trim();
  return posts.find((p) => p.id?.toString().trim() === needle);
}

export async function createPost(data: Partial<Post>): Promise<Post> {
  const fs = await import('fs');
  const fsPromises = fs.promises;
  const posts = await getAllPosts();
  const id = String(Date.now());
  const newPost: Post = {
    id,
    title: data.title ?? 'Untitled',
    shortDescription: data.shortDescription ?? '',
    imageSrc: data.imageSrc ?? '/images.jpg',
    longDescription: data.longDescription ?? '',
  };
  posts.unshift(newPost);
  await fsPromises.writeFile(postsPath, JSON.stringify(posts, null, 2), 'utf8');
  return newPost;
}

export async function updatePost(id: string, data: Partial<Post>): Promise<Post | null> {
  const fs = await import('fs');
  const fsPromises = fs.promises;
  const posts = await getAllPosts();
  const needle = id?.toString().trim();
  const idx = posts.findIndex((p) => p.id?.toString().trim() === needle);
  if (idx === -1) return null;
  const updated = { ...posts[idx], ...data };
  posts[idx] = updated;
  await fsPromises.writeFile(postsPath, JSON.stringify(posts, null, 2), 'utf8');
  return updated;
}

export async function deletePost(id: string): Promise<boolean> {
  try {
    const fs = await import('fs');
    const fsPromises = fs.promises;
    const posts = await getAllPosts();
    // Debug logs to help diagnose delete issues
    // eslint-disable-next-line no-console
    console.log('deletePost called with id:', id);
    // eslint-disable-next-line no-console
    console.log('current posts count:', posts.length);
    const needle = id?.toString().trim();
    const filtered = posts.filter((p) => p.id?.toString().trim() !== needle);
    if (filtered.length === posts.length) {
      // eslint-disable-next-line no-console
      console.warn('deletePost: id not found:', id);
      return false;
    }
    await fsPromises.writeFile(postsPath, JSON.stringify(filtered, null, 2), 'utf8');
    // eslint-disable-next-line no-console
    console.log('deletePost: deleted id, new count:', filtered.length);
    return true;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('deletePost error:', err);
    throw err;
  }
}
