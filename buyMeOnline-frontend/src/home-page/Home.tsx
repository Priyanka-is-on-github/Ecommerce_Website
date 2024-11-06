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
  const [products, setProducts] = useState<
    {
      id: number;
      category: string;
      description: string;
      image: string;
      price: number;
      title: string;
      rating: object;
    }[]
  >([]);
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
      image: "./assets/earings.png",
    },
    {
      title: "Electronics gadgets",
      image: "./assets/laptop.png",
    },
  ];

  

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
          {loading ? (
            Array.from({ length: 1 }).map((_, index) => (
              <Shimmer key={index} width="w-[95vw]" height="h-[70vh]" />
            ))
          ) : (
            <CarouselPlugin />
          )}

          <div className="mt-10 px-4 md:px-8">
            <h2 className="relative font-semibold text-2xl md:text-3xl text-center uppercase">
              Product Categories
              <span className="absolute left-1/2 w-20 md:w-32 h-[2px] md:h-[3px] bg-red-800 transform -translate-x-1/2 -bottom-1 mt-2 md:mt-4"></span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 min-h-96 bg-gray-100  flex-wrap items-center justify-center gap-4 md:gap-6 lg:gap-8 mt-6 ">
              {categories.map((category, index) => (
                <CategoriesCard
                  key={index}
                  title={category.title}
                  image={category.image}
                />
              ))}
            </div>
          </div>

          <div className="mt-10 px-4 md:px-8">
            <h2 className="relative font-semibold text-2xl md:text-3xl text-center uppercase">
              popular Jwelleries
              <span className="absolute left-1/2 w-20 md:w-32 h-[2px] md:h-[3px] bg-red-800 transform -translate-x-1/2 -bottom-0.5"></span>
            </h2>

            <div className="  grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4  mt-10 sm:pl-36  ">
              {products.map((product) => (
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
              <div className="text-center text-sm text-gray-500 mt-10">
                <p>No Products available</p>
              </div>
            )}
          </div>

          <div className="mt-20 px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 mb-4 rounded-none shadow-none bg-gradient-to-b from-pink-300 to-white">
              <div className="p-6 md:px-16 md:py-32 text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold pb-4 text-red-700 text-left">
                  Exclusive <br /> Offers For You
                </div>
                <div className="text-lg sm:text-xl pb-6 text-left">
                  ONLY ON BEST SELLERS PRODUCTS
                </div>
                <Button className="bg-amber-800 flex justify-start px-10 md:px-20 py-2 hover:bg-amber-500 text-sm md:text-base">
                  Check now
                </Button>
              </div>

              <div className="flex items-center justify-center p-4 md:p-0">
                <img
                  src="./assets/groupimage.png"
                  alt="groupimage"
                  className="w-full h-auto max-w-xs sm:max-w-md md:max-w-lg"
                />
              </div>
            </div>
          </div>

          

          <div className="mt-20 px-4 md:px-8">
  <div className="mb-4 rounded-none shadow-none text-center bg-gradient-to-b from-pink-300 to-white">
    <div className="py-10 flex flex-col border-b-slate-400 border-2 border-r-0 border-l-0 border-t-0">
      
      <div className="text-xl sm:text-3xl md:text-5xl font-semibold pb-4 text-red-700">
        Get Exclusive Offers On Your Email
      </div>
      <div className="text-xs sm:text-base md:text-xl pb-4 font-semibold text-slate-800">
        Subscribe to our newsletter and stay updated.
      </div>

      <div className="flex justify-center px-4">
        <form className="flex items-center justify-between w-full sm:w-3/4 md:w-1/2 lg:w-[40%] bg-white rounded-3xl border-2 overflow-hidden">
          <input
            type="email"
            placeholder="Enter your email id"
            required
            className="border-none outline-none w-full h-full px-4 py-2 md:py-3"
          />
          <div>
            <Button className="px-4 md:px-8 mt-1 mr-2 bg-amber-800 text-white rounded-3xl hover:bg-amber-500">
              Subscribe
            </Button>
          </div>
        </form>
      </div>

      <div className="mt-10 md:mt-40 mb-4 md:mb-8 font-semibold text-xl md:text-3xl">Sitemark</div>

      <div className="flex flex-wrap justify-center font-semibold mb-8 md:mb-16 cursor-pointer">
        {["Company", "Products", "Office", "About", "Contact"].map((item) => (
          <button key={item} className="mx-3 md:mx-6 px-4 md:px-8 hover:text-slate-500">
            {item}
          </button>
        ))}
      </div>

      <div className="mb-4 md:mb-2 cursor-pointer flex justify-center space-x-3">
        <InstagramIcon className="hover:text-slate-500" />
        <WhatsAppIcon className="hover:text-slate-500" />
        <PinterestIcon className="hover:text-slate-500" />
      </div>
    </div>
  </div>

  <div className="text-center text-xs md:text-sm text-gray-800 mt-4">
    Copyright © {new Date().getFullYear()} - All Rights Reserved
  </div>
</div>

        </div>
      </Layout>
    </>
  );
}

export default Home;
