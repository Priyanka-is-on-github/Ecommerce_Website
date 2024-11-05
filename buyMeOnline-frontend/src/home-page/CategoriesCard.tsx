import React from 'react'

function CategoriesCard({title, image}) {
  return (
    <div className="grid  grid-cols-4 sm:grid-cols-1 md:grid-cols-4 p-2 cursor-pointer ">
    
      <div
        key={title}
        className="relative group rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border-2 w-80 h-72 "
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-white text-xl font-semibold uppercase">{title}</span>
        </div>
      </div>
    
  </div>
  )
}

export default CategoriesCard