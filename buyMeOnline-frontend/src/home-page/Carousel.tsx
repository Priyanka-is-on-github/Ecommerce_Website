import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "../components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel"
import { Button } from "../components/ui/button"
import { useNavigate } from "react-router-dom"

export function CarouselPlugin() {
    const navigate = useNavigate();

  const plugin = React.useRef(
    
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  const products =()=>{
    navigate('/products')
  }

  const carouselContent = [
    {
      title:"Discover the Latest in Women's Fashion",
      image:"./assets/women.png",
      button:"Explore Now",

    },
    {
      title:"Look Sharp with Our New Men's Collection",
      image:"./assets/men.png",
      button:"Browse Men's Styles",

    },
   
    {
      title:"Add a Touch of Sparkle to Your Look.",
      image:"./assets/jwelery.png",
      button:"Shop Jewelry",

    },
    {
      title:"Discover the Latest in Electronics",
      image:"./assets/electronics.png",
      button:"Explore Gadgets",

    },

  ]
  return (

    <Carousel
      plugins={[plugin.current]}
      
      className="w-[95vw] min-w-20  h-[70vh] min-h-20  "
     
      onMouseLeave={plugin.current.reset}
     
    >
      <CarouselContent>
        {carouselContent.map(( Content, index) => (
          <CarouselItem key={index}>
            <div className="p-1  overflow-hidden h-[70vh] min-h-20">
              <Card className=" flex  h-[100%] bg-gradient-to-b from-pink-300  to-white">

                <CardContent className="flex-1 aspect-square  py-14 px-16  h-[100%] ">
                <div  className="text-6xl font-bold pb-4 text-red-700 text-left">{Content.title}</div>
    <div className="text-sm pb-4 text-left"> "Discover the latest trends and exclusive deals, bringing style and quality right to your doorstep-shop effortlessly and elevate your look with us!"</div>
    <Button className="bg-amber-700 flex justify-start hover:bg-amber-500" onClick={products}> {Content.button}</Button>
                </CardContent>

                <CardContent className=" flex-1 aspect-square  p-6 h-[100%]">
               <img src={Content.image} alt={Content.title} />
                
                </CardContent>

              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
     
    </Carousel>
  )
}
export default CarouselPlugin