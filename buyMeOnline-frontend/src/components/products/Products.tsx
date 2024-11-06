import { ReactEventHandler, useEffect, useState } from "react";

import Layout from "../Layout";

import { Button } from "../ui/button";
import ProductCard from "./ProductCard";
import Shimmer from "../Shimmer";


type productProps={
  id:number, 
  category:string,
   description: string, 
   image:string,
    price:number,
     title:string, 
     rating:object
}

const categories = [
  { name: "men's clothing", value: "men's clothing " },
  { name: "women's clothing", value: "women's clothing" },
  { name: "jewelery", value: "jewelery" },
  { name: "electronics", value: "electronics" },
];

function Products() {
  const [products, setProducts] = useState<{id:number, category:string, description: string, image:string, price:number, title:string, rating:object}[]>([]);
  const [sortproducts, setSortProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (e:any) => {
    setSelectedCategory(e.target.value);
    console.log(`Sorting by ${e.target.value}`);
    // Implement your sorting logic here based on selectedCategory
  };

  function filterProduct(selectedCategory: string, products) {

 console.log('c=', products[0].category === selectedCategory)
    const filterData = products.filter((product:productProps) =>
  

      product?.category?.toLowerCase()?.includes(selectedCategory?.toLowerCase())
    );

    console.log("filterd=", filterData);
    return filterData;
  }

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/products/getallproducts"
        );

        const responseData = await response.json();
    
        setProducts(responseData);
        setSortProducts(responseData);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <>
      <Layout>
      <div className="max-w-[90vw] mx-auto mt-20">
  <div className="grid grid-cols-1 md:grid-cols-2 mb-4 rounded-none shadow-none bg-gradient-to-b from-violet-300 to-white ">
    <div className="space-y-2 md:space-y-0 py-10 md:py-20 px-4 md:px-9 ">
      <div className="text-2xl md:text-4xl lg:text-6xl font-bold pb-2 md:pb-4 text-violet-900 text-left">
        FLAT 50% OFF
      </div>
      <div className="text-lg md:text-xl pb-2 md:pb-4 text-left">
        <span className="text-violet-900">12</span> Hours{" "}
        <span className="text-violet-900">20</span> Mins
      </div>
      <Button className="bg-blue-800 flex justify-start hover:bg-blue-500 px-4 md:px-6 py-2 md:py-3 text-sm md:text-base">
        Explore now
      </Button>
    </div>

    <div className="flex justify-center md:justify-center items-center p-4 md:p-0  ">
      <img src="./assets/boygirl.png" alt="Boy and Girl in Western Outfits" className="w-56 h-72 md:w-72 md:h-auto object-cover  " />
    </div>
  </div>

  <div className="flex flex-wrap gap-4 md:gap-6 justify-end items-center mb-10 md:mb-20">
    <Button className="bg-gray-300 text-black hover:bg-slate-400 px-4 py-2" onClick={() => {
      const FilterData = filterProduct(selectedCategory, products);
      setSortProducts(FilterData);
    }}>
      Sort by
    </Button>
    <select
      name="category"
      onChange={handleCategoryChange}
      className="bg-gray-100 border border-gray-300 rounded-md p-2 text-black hover:bg-gray-200 outline-none border-none"
      value={selectedCategory}
    >
      <option value="">Select a category</option>
      {categories.map((category) => (
        <option key={category.value} value={category.value}>
          {category.name}
        </option>
      ))}
    </select>
  </div>

  <div>
    <div className="flex flex-wrap gap-4 md:gap-6 justify-center">
      {loading
        ? Array.from({ length: 16 }).map((_, index) => (
            <Shimmer key={index} width="w-60 sm:w-72" height="h-64 sm:h-80" />
          ))
        : sortproducts.map((product) => (
            <ProductCard
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
      <div className="text-center text-xs md:text-sm text-gray-600 mt-10">
        <p>No Products available</p>
      </div>
    )}
  </div>
</div>

      </Layout>
    </>
  );
}

export default Products;
