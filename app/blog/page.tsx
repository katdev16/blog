import PostcardSmall from "@/components/blog/PostCard/postcardSmall";
import Link from "next/link";
import { header as Header } from "@/components/common/Navbar/header";

const allPosts = Array.from({ length: 23 }).map((_, i) => ({
  id: String(i + 1),
  title: `Post #${i + 1}`,
  shortDescription: `This is the excerpt for post ${i + 1}`,
  longDescription:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis elementum quis quam eu auctor. Donec accumsan risus vel lacus dictum semper. Nam nibh dui, tempus et iaculis non, egestas et quam. Cras porta, enim at commodo elementum, nisl ipsum suscipit est, non tincidunt orci lectus lobortis erat. Phasellus tincidunt vehicula lobortis. Phasellus id mauris faucibus sapien sodales posuere. Mauris volutpat congue sem ut finibus. Phasellus interdum odio nisi, quis dictum eros bibendum ac." 
  
}));

export default function BlogPage({ searchParams }: { searchParams?: { page?: string } }) {
  const page = Number(searchParams?.page || "1");
  const pageSize = 6;
  const start = (page - 1) * pageSize;
  const paginated = allPosts.slice(start, start + pageSize);
  const totalPages = Math.ceil(allPosts.length / pageSize);

  return (
    <>
     <Header/>
    <div className=" mt-15 flex justify-center items-center">
       
      <main className="">
        <h1 className="text-2xl font-bold mb-4 text-black dark:text-zinc-50">All Posts</h1>

        <div className="space-y-4 grid grid-cols-2 gap-6">
          {paginated.map((p) => (
            <PostcardSmall key={p.id} id={p.id} title={p.title} shortDescription={p.shortDescription} longDescription={p.longDescription} />
          ))}

        </div>

        <div className="mt-6 flex gap-2 justify-center items-center">
          {Array.from({ length: totalPages }).map((_, i) => (
            <Link
              key={i}
              href={`/blog?page=${i + 1}`}
              className={`px-3 py-1 rounded ${i + 1 === page ? "bg-blue-600 text-white" : "bg-white"}`}
            >
              {i + 1}
            </Link>
          ))}
        </div>
      </main>
    </div>
    </>
  );
}
