import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import { CarouselPlugin } from "./Carousel";
import CategoriesCard from "./CategoriesCard";
import Shimmer from "../components/Shimmer";
import WomenCard from "./WomenCard";
import { Button } from "../components/ui/button";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PinterestIcon from "@mui/icons-material/Pinterest";

function Home() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    {
      title: "Women's cloth",
      image: "./assets/women1.png",

    
    },
    {
      title: "Men's cloth",
      image: "./assets/men1.png",
     
    },
    {
      title: "Jwellery ",
      image: "./assets/earrings.png",
   
    },
    {
      title: "Electronics gadgets",
      image: "./assets/laptop.png",
      
    },
  ];

  

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const response = await fetch(
          "https://fakestoreapi.com/products/category/jewelery"
        );

        const responseData = await response.json();
        console.log(responseData);
        setProducts(responseData);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <>
      <Layout>
        <div className="mt-20 ">
        {
          loading?  Array.from({ length: 1 }).map((_, index) => (
            <Shimmer key={index} width="w-[95vw]" height="h-[70vh]" />
          )):<CarouselPlugin />
        }
          

          <div className="mt-10 ">
            <h2 className="relative font-semibold text-3xl text-center uppercase">
              Product Categories
              <span className="absolute left-1/2 w-32 h-[3px] bg-red-800 transform -translate-x-1/2 -bottom-1 mt-4"></span>
            </h2>

            <div className="min-h-96 bg-gray-100 flex items-center justify-center ">
              { categories.map((category, index) => (
                    <CategoriesCard
                      key={index}
                      title={category.title}
                      image={category.image}
                    
                    />
                  ))}
            </div>
          </div>

          <div className="mt-10">
            <h2 className="relative font-semibold text-3xl text-center uppercase">
                  popular Jwelleries
              <span className="absolute left-1/2 w-32 h-[3px] bg-red-800 transform -translate-x-1/2 -bottom-0.5 "></span>
            </h2>

            <div className="flex flex-wrap gap-2  justify-center  mt-10 ">
              { products.map((product) => (
                    <WomenCard
                      key={product?.id}
                      id={product?.id}
                      title={product?.title}
                      imageUrl={product?.image}
                      price={product?.price}
                      category={product?.category}
                    />
                  ))}
            </div>

            {products.length === 0 && !loading && (
              <div className="text-center text-sm text-muted-foreground mt-10">
                <p>No Products available</p>
              </div>
            )}
          </div>

          <div className="mt-20">
            <div className="   grid grid-cols-1 md:grid-cols-2   mb-4 rounded-none shadow-none  bg-gradient-to-b from-pink-300  to-white">
              <div className=" px-32 py-40  text-center">
                <div className="text-2xl sm:text-5xl font-bold pb-6 text-red-700 text-left ">
                  Exclusive <br /> Offers For You
                </div>
                <div className="text-xl sm:text-xl pb-8 text-left">
                  ONLY ON BEST SELLERS PRODUCTS
                </div>
                <Button className="bg-amber-800 flex justify-start px-20  hover:bg-amber-500">
                  Check now
                </Button>
              </div>

              <div>
              <img src="./assets/groupimage.png" alt="groupimage" />
              </div>
            </div>
          </div>

          <div className="mt-20 ">
            <div className="  mb-4 rounded-none shadow-none  text-center bg-gradient-to-b from-pink-300  to-white">
              <div className=" py-10 flex flex-col   border-b-slate-400 border-2 border-r-0 border-l-0 border-t-0 ">
                <div className="text-2xl sm:text-5xl font-semibold pb-6 text-red-700 ">
                  Get Exclusive Offers On Your Email
                </div>
                <div className="text-sm sm:text-xl pb-6 font-semibold text-slate-800">
                  Subscribe to our newsletter and stay updated.
                </div>

<div className=" flex justify-center">


                <form
                
                  className="flex item-center justify-between w-[40%]   bg-white rounded-3xl border-2 overflow-hidden"
                >
                  <input
                    type="email"
                    placeholder="Enter your email id"
                    required
                    className="border-none outline-none w-[100%] h-[100%] px-4 py-3"
                  />
                  <div>
                    <Button className="px-8 mt-1 mr-2 bg-amber-800 text-white rounded-3xl hover:bg-amber-500">
                      
                      Subscribe
                    </Button>
                  </div>
                </form>
                </div>
                <div className="mt-40 mb-8 font-semibold text-3xl">Sitemark</div>

                <div className=" flex justify-center  font-semibold mb-16 cursor-pointer ">
                  <button className=" mr-6 px-8 hover:text-slate-500">
                    Company
                  </button>
                  <button className=" mr-6 px-8 hover:text-slate-500">
                    Products
                  </button>
                  <button className=" mr-6 px-8 hover:text-slate-500">
                    Office
                  </button>
                  <button className=" mr-6 px-8 hover:text-slate-500">
                    About
                  </button>
                  <button className=" mr-6 px-8 hover:text-slate-500">
                    Contact
                  </button>
                </div>

                <div className="mb-2 cursor-pointer">
                  <InstagramIcon className="mr-3 hover:text-slate-500" />
                  <WhatsAppIcon className="mr-3 hover:text-slate-500" />
                  <PinterestIcon className="mr-3 hover:text-slate-500" />
                </div>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-gray-800 mt-4">
      Copyright © {currentYear} - All Rights Reserved
    </div>
        </div>
      </Layout>
    </>
  );
}

export default Home;
