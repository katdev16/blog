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
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!loaded) {
    return <Loader />;
  } else {
    const isAuthed = Boolean(auth);

    return (
      <header className="mt-10 px-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/Blogstar.svg" alt="Blogstar" className="h-8" />
          </div>

          {/* Hamburger button - visible on small screens only */}
          <button
            className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((s) => !s)}
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex gap-4 items-center">
            <Link href="/" className="text-blue-600">Home</Link>
            <Link href="/about" className="text-blue-600">About</Link>
            <Link href="/blog" className="text-blue-600">Blogs</Link>
            <Link href="/contact" className="text-blue-600">Contact</Link>
            <Link href="/dashboard" className="text-blue-600">Dashboard</Link>

            {isAuthed ? (
              <a href="#" onClick={handleLogout} className="text-blue-600">Logout</a>
            ) : (
              <Link href="/login" className="text-blue-600">Login</Link>
            )}
          </nav>
        </div>

        {/* Mobile menu (small screens) */}
        <div className={`md:hidden mt-3 px-4 ${mobileOpen ? 'block' : 'hidden'}`}>
          <div className="flex flex-col gap-3 bg-white p-3 rounded shadow-sm">
            <Link href="/" className="text-blue-600">Home</Link>
            <Link href="/about" className="text-blue-600">About</Link>
            <Link href="/blog" className="text-blue-600">Blogs</Link>
            <Link href="/contact" className="text-blue-600">Contact</Link>
            <Link href="/dashboard" className="text-blue-600">Dashboard</Link>

            {isAuthed ? (
              <a href="#" onClick={(e) => { setMobileOpen(false); handleLogout(e); }} className="text-blue-600">Logout</a>
            ) : (
              <Link href="/login" className="text-blue-600">Login</Link>
            )}
          </div>
        </div>
      </header>
    );
  }

 
};
