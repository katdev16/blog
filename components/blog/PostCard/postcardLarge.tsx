import React from 'react'
import Link from 'next/link'

type PostcardProps = {
  id?: string
  title?: string
  shortDescription?: string
  longDescription?: string
}

export default function PostcardLarge({ id, title = 'Postcard Large', shortDescription = 'This is a placeholder for the large post card component.' }: PostcardProps) {
  return (
    <div className="p-6 border rounded-md bg-white shadow-sm w-120 h-40">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-zinc-600 mt-2">{shortDescription}</p>
      {id && (
        <div className="mt-4">
          <Link href={`/blog/${id}`} className="text-blue-600">Read more →</Link>
        </div>
      )}
    </div>
  )
}
