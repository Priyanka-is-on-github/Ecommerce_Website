import formatPrice from '../lib/format'


type jwellerycardProps={
  id:number,
  title:string,
  imageUrl: string,
  category:string,
  price:number,
}
function JwelleryCard({  title, imageUrl, category, price }:jwellerycardProps) {
  return (
    
    <div className="group transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl overflow-hidden m-1 p-4 h-full md:w-72 sm:w-80 cursor-pointer border-2 border-slate-200 ">
    <div className="relative h-72 flex justify-center p-6 ">
      <img className="h-full group-hover:scale-110 transition-transform duration-300 ease-in-out" alt={title} src={imageUrl} />
    </div>
  
    <div className="flex flex-col pt-4">
      <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition-colors duration-300 line-clamp-2 text-left">
        {title}
      </div>
  
      <p className="text-xs pt-1 text-left">{category}</p>
  
      <p className="text-md md:text-sm font-medium text-slate-700 pt-1 text-left">
        {formatPrice(price)}
      </p>
    </div>
  </div>
  )
}

export default JwelleryCard