import { useEffect, useState, useContext } from "react";
import Layout from "../Layout";
import { Button } from "../ui/button";
import Shimmer from "../Shimmer";
import { useParams } from "react-router-dom";
import formatPrice from "../../lib/format";
import StarRating from "../StarRating";
import { CartContext } from "../../utils/contextUtils";
import { ProductType } from "../../types/ContextTypes";

export default function Product() {
  const [products, setProducts] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const size = ["S", "M", "L", "XL", "XXL"];
  const { cart, addToCart, decrementFromCart } = useContext(CartContext);

  // if (id === undefined) return;
  const productId = id !== undefined ? id : "-1";
  const productInCart = cart.find((item) => item.id === parseInt(productId));

  const addItemToCart = async () => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const product = await response.json();
    addToCart(product);
  };

  const decrementItemFromCart = async () => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const product: ProductType = await response.json();
    decrementFromCart(product.id);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const responseData = await response.json();
        setProducts(responseData);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  return (
    <Layout>
      <div className="max-w-[90vw] mx-auto mt-20">
        {loading ? (
          Array.from({ length: 1 }).map((_, index) => (
            <Shimmer
              key={index}
              width="w-full sm:w-[80vw]"
              height="h-64 sm:h-80"
            />
          ))
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 mb-4 rounded-none shadow-none overflow-hidden gap-4 md:gap-6">
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <div className="w-full md:w-24 flex md:flex-col gap-2 md:gap-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="relative w-full h-32 md:h-[15vh] mb-2 md:mb-3"
                  >
                    <img
                      alt={products?.title}
                      src={products?.image}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="relative w-full h-64 md:w-[30vw] sm:h-80 border-2 border-red-700 overflow-hidden">
                <img
                  alt={products?.title}
                  src={products?.image}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="p-3">
              <div className="text-xl sm:text-2xl pb-4 font-semibold text-left">
                {products?.title}
              </div>
              <div className="text-left">
                <StarRating rating={products?.rating?.rate} maxStars={5} />
              </div>
              <p className="text-md md:text-sm font-medium text-slate-800 py-4 text-left">
                {products?.price ? formatPrice(products?.price) : 0}
              </p>
              <div className="text-left mb-8 font-semibold">
                <p>{products?.description}</p>
              </div>
              {["men's clothing", "women's clothing"].includes(
                products?.category ? products?.category : ""
              ) && (
                <div className="flex gap-x-4 m-4 md:m-6">
                  <h3 className="font-bold">Select size:</h3>
                  {size.map((sizeValue) => (
                    <div
                      key={sizeValue}
                      className="bg-orange-100 h-8 w-10 md:h-10 md:w-12 font-bold text-center pt-1 md:pt-2 text-sm md:text-base"
                    >
                      {sizeValue}
                    </div>
                  ))}
                </div>
              )}
              <p className="my-5 text-left">
                <span className="font-bold">Category:</span>{" "}
                {products?.category}
              </p>
              {productInCart ? (
                <div className="flex">
                  <div className="flex items-center gap-4 bg-blue-50 p-2">
                    <Button
                      onClick={decrementItemFromCart}
                      className="bg-blue-400 text-white flex items-center justify-center text-xl"
                    >
                      -
                    </Button>
                    <span className="font-bold">{productInCart.quantity}</span>
                    <Button
                      onClick={addItemToCart}
                      className="bg-blue-400 text-white flex items-center justify-center text-xl"
                    >
                      +
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  className="bg-red-700 hover:bg-red-500 w-full md:w-auto"
                  onClick={addItemToCart}
                >
                  Add to Cart
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
