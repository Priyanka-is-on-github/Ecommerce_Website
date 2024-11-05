import React, { useEffect, useState } from "react";

import Layout from "../Layout";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import Shimmer from "../Shimmer";
import { useNavigate, useParams } from "react-router-dom";
import formatPrice from "../../lib/format";
import StarRating from "../StarRating";
import { Category } from "@mui/icons-material";

export default function Product() {
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const size: string[] = ["S", "M", "L", "XL", "XXL"];
const navigate = useNavigate()


  const checkOut = ()=>{
    navigate(`/checkout/${id}`)
  }

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);

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
    <Layout>
     <div className="max-w-[80vw] mt-20 ">
        {loading ? (
          Array.from({ length: 1 }).map((_, index) => (
            <Shimmer key={index} width="w-[80vw]" height="h-80" />
          ))
        ) : (
          <div className="  grid grid-cols-1 md:grid-cols-2  mb-4 rounded-none shadow-none  overflow-hidden  gap-3">
            <div className=" flex flex-row justify-center space-y-0   gap-4 ">
              <div className=" w-24 ">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div className="relative   w-full  h-[15vh]  mb-3 ">
                    <img
                      
                      alt={products?.title}
                      src={products?.image}
                    />
                  </div>
                ))}
              </div>

              <div className="relative   w-[30vw]  h-[80%] sm:w-full   ">
                <img
                
                  alt={products?.title}
                  src={products?.image}
                />
              </div>
            </div>

            <div className="p-3 ">
              <div className="text-2xl pb-4  font-semibold text-left">
            
                {products?.title}
              </div>

              <div className=" text-left">
                <StarRating rating={products?.rating?.rate} />
              </div>

              <p className="text-md md:text-sm font-medium text-slate-800 py-4 text-left">
                {formatPrice(products?.price)}
              </p>

<div className=" text-left mb-8 font-semibold ">
<p> {products?.description}</p>
</div>
            

              {products?.category === "men's clothing" ||
              products?.category === "women's clothing" ? (
                <div className="flex gap-x-4 m-6 ml-0">
                  <h3 className="font-bold ">Select size:</h3>
                  {size.map((sizeValue) => (
                    <div
                      key={sizeValue}
                      className="bg-orange-100 h-10 w-12 font-bold text-center pt-2"
                    >
                      {sizeValue}
                    </div>
                  ))}
                </div>
              ) : null}

             

            
              <p className="my-5 text-left">  <span className="font-bold ">Category:</span> {products?.category}</p>
              <Button className="bg-red-700 hover:bg-red-500 " onClick={checkOut}> Buy now</Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
