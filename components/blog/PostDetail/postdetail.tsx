import React from 'react'


type PostDetail = {
  id?: string
  title?: string
  shortDescription?: string
  longDescription?: string
  imageSrc?: string
}

export const Postdetail = ({ id, 
    title = 'Postcard Large', 
    shortDescription = 'This is a placeholder for the large post card component.', 
    longDescription = 'This is a placeholder for the long description.', 
    imageSrc = '/images.jpg' 
}: PostDetail) => {
  return (
    <div>

       <div className=' mt-20 mb-10 flex flex-row gap-6'>

        <img src={imageSrc} alt="Post image" className="w-32 h-32 object-cover rounded-md float-left mr-6" />
        <h3 className="text-xl font-semibold">{title}</h3>

      </div>


      {/* <p className="text-zinc-600 mt-2">{shortDescription}</p> */}
      <p className="text-zinc-600 mt-2 mb-5">{longDescription}</p>
      
    </div>
  )
}
