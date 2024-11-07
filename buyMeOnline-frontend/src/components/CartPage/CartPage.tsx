import { useContext, useState } from "react";
import { CartContext } from "../../utils/contextUtils";
import Layout from "../Layout";
import Shimmer from "../Shimmer";
import formatPrice from "../../lib/format";
import {useNavigate} from "react-router-dom"
function CartPage() {
  const [loading] = useState(false);
  const { cart } = useContext(CartContext);
  console.log(cart);
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  const navigate=useNavigate();

  const createPayment = async () => {
    if (sessionStorage.getItem("token") === null) {
      return;
    }
    const tokenValue = sessionStorage.getItem("token");
    if (!tokenValue) {
      return;
    }
    console.log(tokenValue);
    const token = JSON.parse(tokenValue);

    console.log("first");
    try {
      const response = await fetch(
        `${SERVER_URL}/api/v1/createpayment/create`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token.token}`,
          },
          body: JSON.stringify(cart),
        }
      );

      const jsonResponse = await response.json();
      console.log("jsonr=", jsonResponse);
navigate(`/paymentstatus?status=${jsonResponse.status}`);
    } catch (error) {
      console.log(error);
    }
  };

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

            {cart.length > 0 ? (
              <div className=" border-2 border-t-slate-300 border-b-slate-300 mt-4 grid grid-cols-5   py-4 border-l-0 border-r-0 text-center">
                {cart?.map((item) => {
                  return (
                    <>
                      <div className="w-28 h-32 self-center md:ml-20 ml-0">
                        <img
                          src={item?.image}
                          alt={item?.title}
                          className="h-[100%]"
                        />
                      </div>

                      <p>{item?.title}</p>

                      <p className="text-md md:text-sm font-medium text-slate-800 ">
                        {formatPrice(item?.price)}
                      </p>

                      <div>{item?.quantity}</div>

                      <p className="text-md md:text-sm font-medium text-slate-800 ">
                        {formatPrice(item?.price)}
                      </p>
                    </>
                  );
                })}
              </div>
            ) : (
              <div className=" border-2 border-t-slate-300 border-b-slate-300 mt-4 grid grid-cols-5   py-4 border-l-0 border-r-0 text-center gap-2">
                <div className="w-32 h-32 self-center md:ml-20 ml-0 bg-slate-50"></div>

                <p className="bg-slate-50 tracking-widest font-semibold">
                  Not items in cart
                </p>

                <p className="text-md md:text-sm font-medium text-slate-800 bg-slate-50"></p>

                <div className="bg-slate-50"></div>

                <p className="text-md md:text-sm font-medium text-slate-800 bg-slate-50"></p>
              </div>
            )}

            <button
              className=" bg-blue-500 my-8 ml-20 p-2 text-white rounded-lg font-bold"
              onClick={createPayment}
            >
              Proceed to checkout
            </button>
          </>
        )}
      </div>
    </Layout>
  );
}

export default CartPage;
