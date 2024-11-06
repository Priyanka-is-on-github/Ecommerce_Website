

type newCollectionProductsProps={
    imageUrl:string;
    title:string;
    price:number;
    category:string;
}
function NewCollectionCard({imageUrl, title, price, category} : newCollectionProductsProps) {
  return (
    <div className="group  transition overflow-hidden  m-1 p-4 h-full md:w-60 sm:w-80 hover:shadow-2xl cursor-pointer border-2 border-slate-200">
          <div className="relative    h-72  flex justify-center">
            <img className=" h-[100%] " alt={title} src={imageUrl} />
          </div>

          <div className="flex flex-col pt-2 ">
            <div className="text-lg md:text-base font-medium   transition line-clamp-2 text-left">
              {title}
            </div>

            <p className="text-xs pt-1 text-left">{category}</p>

            <p className="text-md md:text-sm font-medium text-slate-700 pt-1 text-left">
              {price}
            </p>
          </div>
        </div>
  )
}

export default NewCollectionCard