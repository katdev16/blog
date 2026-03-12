"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader } from "../Loader/loader";

export const header = () => {
  const [auth, setAuth] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const a = typeof window !== "undefined" ? localStorage.getItem("auth") : null;
    setAuth(a);
    setLoaded(true);
  }, []);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth");
    }
    setAuth(null);
    router.push("/login");
  };

  if (!loaded) {
    return (
      <Loader />
    );
  }else{
     const isAuthed = Boolean(auth);

  return (
    <div className=" mt-10 flex flex-row items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <img src="/Blogstar.svg" alt="Blogstar" className="h-8" />
      </div>

      <nav className="flex gap-4">
        <Link href="/" className="text-blue-600">Home</Link>
        <Link href="/about" className="text-blue-600">About</Link>
        <Link href="/blog" className="text-blue-600">Blogs</Link>
        <Link href="/contact" className="text-blue-600">Contact</Link>

        {isAuthed ? (
          // use an anchor so we can intercept click for logout
          <a href="#" onClick={handleLogout} className="text-blue-600">Logout</a>
        ) : (
          <Link href="/signup" className="text-blue-600">Sign up</Link>
        )}
      </nav>
    </div>
  );

  }

 
};
