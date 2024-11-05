import { createContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import SignUp from "./components/Authentication/SignUp";
import SignIn from "./components/Authentication/SignIn";
import Home from "./home-page/Home";
import Products from "./components/products/Products";
import ProductDetail from './components/products/ProductDetail'
import CheckoutPage from "./components/CheckoutPage";


function App() {
 

  return (
    <>
      
 
 

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/products" element={<Products />} />
        <Route path="/productdetail/:id" element={<ProductDetail />} />
        <Route path="/checkout/:id" element={<CheckoutPage />} />
      </Routes>
    </>
  );
}

export default App;
