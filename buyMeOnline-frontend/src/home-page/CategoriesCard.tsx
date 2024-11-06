


type categoryProps ={
  title:string,
  image:string,
}
function CategoriesCard({title, image}: categoryProps) {
  return (
    <div className="p-2 cursor-pointer  ">
      <div
        key={title}
        className="relative group rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border-2 w-full h-64 sm:h-72 md:h-80 lg:h-96"
      >
        <img
          src={image}
          alt={title}
          className=" w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-semibold uppercase">{title}</span>
        </div>
      </div>
    </div>
  )
}

export default CategoriesCard