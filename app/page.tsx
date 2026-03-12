import Link from "next/link";
import PostcardLarge from "@/components/blog/PostCard/postcardLarge";
import { header as Header } from "@/components/common/Navbar/header";


const featuredPosts = [
  { id: "1", title: "Introducing our blog", shortDescription: "Welcome to the blog — first post.", longDescription:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis elementum quis quam eu auctor. Donec accumsan risus vel lacus dictum semper. Nam nibh dui, tempus et iaculis non, egestas et quam. Cras porta, enim at commodo elementum, nisl ipsum suscipit est, non tincidunt orci lectus lobortis erat. Phasellus tincidunt vehicula lobortis. Phasellus id mauris faucibus sapien sodales posuere. Mauris volutpat congue sem ut finibus. Phasellus interdum odio nisi, quis dictum eros bibendum ac." },
  { id: "2", title: "How to write great posts",  shortDescription: "Tips and tricks for better writing.",longDescription:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis elementum quis quam eu auctor. Donec accumsan risus vel lacus dictum semper. Nam nibh dui, tempus et iaculis non, egestas et quam. Cras porta, enim at commodo elementum, nisl ipsum suscipit est, non tincidunt orci lectus lobortis erat. Phasellus tincidunt vehicula lobortis. Phasellus id mauris faucibus sapien sodales posuere. Mauris volutpat congue sem ut finibus. Phasellus interdum odio nisi, quis dictum eros bibendum ac." },
  { id: "3", title: "Advanced writing techniques", shortDescription: "Take your writing to the next level.",longDescription:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis elementum quis quam eu auctor. Donec accumsan risus vel lacus dictum semper. Nam nibh dui, tempus et iaculis non, egestas et quam. Cras porta, enim at commodo elementum, nisl ipsum suscipit est, non tincidunt orci lectus lobortis erat. Phasellus tincidunt vehicula lobortis. Phasellus id mauris faucibus sapien sodales posuere. Mauris volutpat congue sem ut finibus. Phasellus interdum odio nisi, quis dictum eros bibendum ac." },
  { id: "4", title: "Getting started with blogging", shortDescription: "A beginner's guide to starting your blog.", longDescription:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis elementum quis quam eu auctor. Donec accumsan risus vel lacus dictum semper. Nam nibh dui, tempus et iaculis non, egestas et quam. Cras porta, enim at commodo elementum, nisl ipsum suscipit est, non tincidunt orci lectus lobortis erat. Phasellus tincidunt vehicula lobortis. Phasellus id mauris faucibus sapien sodales posuere. Mauris volutpat congue sem ut finibus. Phasellus interdum odio nisi, quis dictum eros bibendum ac." },
];

export default function Home() {
  return (
    <div>


    <Header/>
        <h1 className="ml-30 mt-15 text-2xl">Featured Posts</h1>

        <div className="ml-30 grid grid-cols-2 gap-6 mt-15">
          {featuredPosts.map((post) => (
            <PostcardLarge key={post.id} id={post.id} title={post.title} shortDescription={post.shortDescription} />
          ))}
        </div>


    </div>
  );
}
