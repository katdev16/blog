import Link from "next/link";
import PostcardLarge from "@/components/blog/PostCard/postcardLarge";
import { header as Header } from "@/components/common/Navbar/header";
import { getAllPosts } from "../lib/posts";
// const featuredPosts = [
//   { id: "1", title: "Introducing our blog", shortDescription: "Welcome to the blog — first post.", imageSrc: "/images.jpg", longDescription:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis elementum quis quam eu auctor. Donec accumsan risus vel lacus dictum semper. Nam nibh dui, tempus et iaculis non, egestas et quam. Cras porta, enim at commodo elementum, nisl ipsum suscipit est, non tincidunt orci lectus lobortis erat. Phasellus tincidunt vehicula lobortis. Phasellus id mauris faucibus sapien sodales posuere. Mauris volutpat congue sem ut finibus. Phasellus interdum odio nisi, quis dictum eros bibendum ac." },
//   { id: "2", title: "How to write great posts",  shortDescription: "Tips and tricks for better writing.", imageSrc: "/images.jpg", longDescription:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis elementum quis quam eu auctor. Donec accumsan risus vel lacus dictum semper. Nam nibh dui, tempus et iaculis non, egestas et quam. Cras porta, enim at commodo elementum, nisl ipsum suscipit est, non tincidunt orci lectus lobortis erat. Phasellus tincidunt vehicula lobortis. Phasellus id mauris faucibus sapien sodales posuere. Mauris volutpat congue sem ut finibus. Phasellus interdum odio nisi, quis dictum eros bibendum ac." },
//   { id: "3", title: "Advanced writing techniques", shortDescription: "Take your writing to the next level.", imageSrc: "/images.jpg", longDescription:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis elementum quis quam eu auctor. Donec accumsan risus vel lacus dictum semper. Nam nibh dui, tempus et iaculis non, egestas et quam. Cras porta, enim at commodo elementum, nisl ipsum suscipit est, non tincidunt orci lectus lobortis erat. Phasellus tincidunt vehicula lobortis. Phasellus id mauris faucibus sapien sodales posuere. Mauris volutpat congue sem ut finibus. Phasellus interdum odio nisi, quis dictum eros bibendum ac." },
//   { id: "4", title: "Getting started with blogging", shortDescription: "A beginner's guide to starting your blog.", imageSrc: "/images.jpg", longDescription:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis elementum quis quam eu auctor. Donec accumsan risus vel lacus dictum semper. Nam nibh dui, tempus et iaculis non, egestas et quam. Cras porta, enim at commodo elementum, nisl ipsum suscipit est, non tincidunt orci lectus lobortis erat. Phasellus tincidunt vehicula lobortis. Phasellus id mauris faucibus sapien sodales posuere. Mauris volutpat congue sem ut finibus. Phasellus interdum odio nisi, quis dictum eros bibendum ac." },
// ];


// Force this App Router page to be server-rendered on every request (SSR)
export const dynamic = 'force-dynamic';


export default async function Home() {
  // const allPosts = await getAllPosts();
  // const paginated = allPosts.slice(0, 4);


   const res = await fetch('https://dummyjson.com/posts?limit=4');
  if (!res.ok) throw new Error('Failed to fetch posts from external API');
  const data = await res.json();
  const allPosts = (data.posts || []).map((p: any) => ({
    id: String(p.id),
    title: p.title,
    shortDescription: p.body?.slice(0, 20) ?? '',
    longDescription: p.body ?? '',
    imageSrc: p.image ?? '/images.jpg',
  }));

  return (
    <div>
      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-6">Featured Posts</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {allPosts.map((post: any) => (
            <div key={post.id} className="w-full">
              <PostcardLarge id={post.id} title={post.title} shortDescription={post.shortDescription} imageSrc={post.imageSrc} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
