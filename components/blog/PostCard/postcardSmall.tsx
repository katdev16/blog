import React from 'react'
import Link from 'next/link'

type PostcardProps = {
  id?: string
  title?: string
  shortDescription?: string
  longDescription?: string
}

export default function PostcardSmall({ id, title = 'Postcard Small', shortDescription = 'This is a placeholder for the small post card component.' }: PostcardProps) {
  return (
    <div className="p-4 border rounded-md bg-white shadow-sm w-100 h-40">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-zinc-600 mt-1">{shortDescription}</p>
      {id && (
        <div className="mt-2">
          <Link href={`/blog/${id}`} className="text-blue-600">Read more →</Link>
        </div>
      )}
    </div>
  )
}
