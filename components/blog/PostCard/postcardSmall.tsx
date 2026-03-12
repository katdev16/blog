import React from 'react'
import Link from 'next/link'

type PostcardProps = {
  id?: string
  title?: string
  shortDescription?: string
  longDescription?: string
  imageSrc?: string
}

export default function PostcardSmall({
  id,
  title = 'Postcard Small',
  shortDescription = 'This is a placeholder for the small post card component.',
  imageSrc = '/images.jpg',
}: PostcardProps) {
  return (
    <div className="p-4 border rounded-md bg-white shadow-sm w-100 h-40 flex items-start gap-4">
      <img src={imageSrc} alt={title} className="w-20 h-20 object-cover rounded-md" />
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-zinc-600 mt-1">{shortDescription}</p>
        {id && (
          <div className="mt-2">
            <Link href={`/blog/${id}`} className="text-blue-600">Read more →</Link>
          </div>
        )}
      </div>
    </div>
  )
}
