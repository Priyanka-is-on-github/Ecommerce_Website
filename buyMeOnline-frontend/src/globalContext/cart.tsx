/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useState } from "react";

import { CartContext } from "../utils/contextUtils";
import { CartItem } from "../types/ContextTypes";
type Props = {
  children: React.ReactNode;
};
export const CartProvider = ({ children }: Props) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  console.log("cart from cart provider", cart);

  const addToCart = (product: CartItem) => {
    console.log("add cart to product");

    setCart((prevCart) => {
      const productExists = prevCart.find(
        (item: CartItem) => item.id === product.id
      );
      if (productExists) {
        return prevCart.map((item: CartItem) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const decrementFromCart = (productId: number): void => {
    setCart((prevCart) =>
      prevCart
        .map((item: any) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item: any) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId: number): void => {
    setCart((prevCart) =>
      prevCart.filter((item: any) => item.id !== productId)
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, decrementFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
