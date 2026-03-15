// "use client"

import PostcardSmall from "@/components/blog/PostCard/postcardSmall";
import Pagination from "./Pagination";
import CreatePostForm from '@/components/blog/CreatePostForm/CreatePostForm';
import PostActions from '@/components/blog/PostActions/PostActions';
import Link from "next/link";
import { header as Header } from "@/components/common/Navbar/header";
import { getAllPosts } from "../../lib/posts";
// import React, {  useState } from "react";

// Force this App Router page to be server-rendered on every request (SSR)
export const dynamic = 'force-dynamic';

export default async function BlogPage({ searchParams }: { searchParams?: Promise<{ page?: string }> | { page?: string } }) {
  const sp = await searchParams;
  const page = Number(sp?.page || "1");
  const pageSize = 6;

  const allPosts = await getAllPosts();

  const start = (page - 1) * pageSize;
  const paginated = allPosts.slice(start, start + pageSize);
  const totalPages = Math.ceil(allPosts.length / pageSize);
  // const [auth, setAuth] = useState<string | null>(null);

  //  useEffect(() => {
  //     const a = typeof window !== "undefined" ? localStorage.getItem("auth") : null;
  //     setAuth(a);
     
  //   }, []);

   const auth = typeof window !== "undefined" ? localStorage.getItem("auth") : null;
   console.log("Auth status:", auth);
      // setAuth(a);

  return (
    <>
     <Header/>
     {auth && (
      <div className="mt-20 ml-20 max-w-5xl px-4">
        <CreatePostForm />
      </div>
    )}
     
    <div className=" mt-15 flex justify-center items-center">
      
      <main className="">
        <h1 className="text-2xl font-bold mb-4 text-black dark:text-zinc-50">All Posts</h1>

        <div className="space-y-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {paginated.map((p: any) => (
            <div key={p.id} className="relative">
              <PostcardSmall id={p.id} title={p.title} shortDescription={p.shortDescription} longDescription={p.longDescription} imageSrc={p.imageSrc} />
              <div className="absolute top-2 right-2">
                <PostActions id={p.id} />
              </div>
            </div>
          ))}

        </div>

        <Pagination page={page} totalPages={totalPages} />
      </main>
    </div>
    </>
  );
}
