import React from 'react'
import Link from "next/link";

export const header = () => {
  return (
    <div className="flex flex-row gap-200">
    <img src="/Blogstar.svg" alt="Blogstar" className="h-8 ml-20 mt-10" />


        <nav className="flex gap-4 mt-10">
          <Link href="/" className="text-blue-600">Home</Link>
          <Link href="/about" className="text-blue-600">About</Link>
          <Link href="/blog" className="text-blue-600">Blogs</Link>
          <Link href="/contact" className="text-blue-600">Contact</Link>
        </nav>
    </div>
  )
}
