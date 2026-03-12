import React from 'react'
import Link from 'next/link'

type PostcardProps = {
  id?: string
  title?: string
  shortDescription?: string
  longDescription?: string
  imageSrc?: string
}

export default function PostcardLarge({ id, title = 'Postcard Large', shortDescription = 'This is a placeholder for the large post card component.', imageSrc = '/images.jpg' }: PostcardProps) {
  return (
    <div className="p-6 border rounded-md bg-white shadow-sm w-120 h-40">
        <img src={imageSrc} alt="Post image" className="w-32 h-32 object-cover rounded-md float-left mr-6" />
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
