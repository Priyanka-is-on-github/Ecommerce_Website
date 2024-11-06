import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "../components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
 
} from "../components/ui/carousel"
import { Button } from "../components/ui/button"


export function CarouselPlugin() {
    

  const plugin = React.useRef(
    
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

 

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
    className="w-[95vw] min-w-20 h-[70vh] min-h-20"
    onMouseLeave={plugin.current.reset}
  >
    <CarouselContent>
      {carouselContent.map((Content, index) => (
        <CarouselItem key={index}>
          <div className="p-1 overflow-hidden h-[70vh] min-h-20">
            <Card className="flex h-full bg-gradient-to-b from-pink-300 to-white flex-col md:flex-row">
              
          
              <CardContent className="flex-1 p-4 md:py-14 md:px-16 h-full ">
                <div className="text-3xl md:text-6xl font-bold pb-2 md:pb-4  text-red-700 text-left">
                  {Content.title}
                </div>
                <div className="text-xs md:text-sm pb-2 md:pb-4 text-left">
                  Discover the latest trends and exclusive deals, bringing style and quality right to your doorstep — shop effortlessly and elevate your look with us!
                </div>
                <Button className="bg-amber-700 hover:bg-amber-500 text-xs md:text-base py-2 px-4 md:py-3 md:px-6">
                  {Content.button}
                </Button>
              </CardContent>
              
      
              <CardContent className="flex-1 p-4 h-full">
                <img
                  src={Content.image}
                  alt={Content.title}
                  className="w-full h-auto max-h-[300px] md:max-h-[500px] object-cover rounded-md"
                />
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