import { useEffect, useState } from "react";
import Layout from "./Layout";
import { useNavigate, useParams } from "react-router-dom";
import formatPrice from "../lib/format";
import { Button } from "../components/ui/button";
import Shimmer from "./Shimmer";
import { ProductType } from "../types/ContextTypes";

function CheckoutPage() {
  const [products, setProducts] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const createPayment = async () => {
    console.log("first");
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/createpayment/create",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            id,
            price: products?.price,
            title: products?.title,
          }),
        }
      );

      const jsonResponse = await response.json();

      console.log("jsonr=", jsonResponse);

      if (jsonResponse.status === "success") {
        navigate(`/paymentstatus?status=${"success"}`);
      } else {
        navigate(`/paymentstatus?status=${"failed"}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      <div className="mt-20 ">
        {loading ? (
          Array.from({ length: 1 }).map((_, index) => (
            <Shimmer key={index} width="w-96" height="h-80" />
          ))
        ) : (
          <>
            <div className="  grid grid-cols-5 py-4 font-bold  text-center">
              <h2>Products</h2>
              <h2>Title</h2>
              <h2>Price</h2>
              <h2>Quantity</h2>
              <h2>Total</h2>
            </div>

            <div className=" border-2 border-t-slate-300 border-b-slate-300 mt-4 grid grid-cols-5   py-4 border-l-0 border-r-0 text-center">
              <div className="w-28 h-32  md:ml-20 ml-0">
                <img
                  src={products?.image}
                  alt={products?.title}
                  className="h-[100%]"
                />
              </div>

              <p>{products?.title}</p>

              <p className="text-md md:text-sm font-medium text-slate-800 ">
                {formatPrice(products?.price ? products?.price : 0)}
              </p>

              <div>1</div>

              <p className="text-md md:text-sm font-medium text-slate-800 ">
                {formatPrice(products?.price ? products?.price : 0)}
              </p>
            </div>

            <Button
              className=" bg-orange-700 my-8 ml-20 hover:bg-orange-500"
              onClick={() => createPayment()}
            >
              Proceed to checkout
            </Button>
          </>
        )}
      </div>
    </Layout>
  );
}

export default CheckoutPage;
