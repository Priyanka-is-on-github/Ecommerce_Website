import { useEffect, useState } from "react";

import Layout from "../Layout";

import { Button } from "../ui/button";
import ProductCard from "./ProductCard";
import Shimmer from "../Shimmer";

const categories = [
  { name: "men's clothing", value: "men's clothing " },
  { name: "women's clothing", value: "women's clothing" },
  { name: "jewelery", value: "jewelery" },
  { name: "electronics", value: "electronics" },
];

function Products() {
  const [products, setProducts] = useState([]);
  const [sortproducts, setSortProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    console.log(`Sorting by ${e.target.value}`);
    // Implement your sorting logic here based on selectedCategory
  };

  function filterProduct(selectedCategory, products) {

 console.log('c=', products[0].category === selectedCategory)
    const filterData = products.filter((product) =>
  

      product?.category?.toLowerCase()?.includes(selectedCategory?.toLowerCase())
    );

  console.log('filterd=', filterData)
    return filterData;
  }
  
  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const response = await fetch("https://fakestoreapi.com/products");

        const responseData = await response.json();
        console.log(responseData);
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
        <div className="max-w-[80vw] mt-20 ">
          <div className="   grid grid-cols-1 md:grid-cols-2  mb-4 rounded-none shadow-none  bg-gradient-to-b from-violet-300  to-white">
            <div className="space-y-0   py-20 px-9 ">
              <div className="text-3xl sm:text-6xl font-bold pb-4 text-violet-900 text-left">
                FLAT 50% OFF
              </div>
              <div className="text-xl sm:text-xl pb-4 text-left">
              
                <span className="text-violet-900 ">12</span> Hours{" "}
                <span className="text-violet-900 ">20</span> Mins
              </div>
              <Button className="bg-blue-800 flex justify-start hover:bg-blue-500">
             
                Explore now
              </Button>
            </div>

            <div >
              <img src='./assets/boygirl.png' alt="Boy and Girl in Western Outfits" className="w-72 h-90" />
            </div>
          </div>

<div className="flex justify-end mb-20">

<Button className="bg-gray-300 text-black hover:bg-slate-400" onClick={() => {

        const FilterData = filterProduct(selectedCategory, products);

        setSortProducts(FilterData);
      }} >
        Sort by
      </Button>
      <select
        name="category"
        onChange={handleCategoryChange}
        className="bg-gray-100 border border-gray-300 rounded-md p-2 text-black hover:bg-gray-200 outline-none border-none"
        value={selectedCategory}
      >
        <option value="">Select a  category</option>
        {categories.map((category) => (
          <option key={category.value} value={category.value}>
            {category.name}
          </option>
        ))}
      </select>
</div>
          <div>
            <div className="flex flex-wrap gap-2  justify-center ">
              {loading
                ? Array.from({ length: 16 }).map((_, index) => (
                    <Shimmer key={index} width="w-72" height="h-80" />
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
              <div className="text-center text-sm text-muted-foreground mt-10">
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
