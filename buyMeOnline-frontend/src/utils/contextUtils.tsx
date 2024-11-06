import { CartContextType } from "../types/ContextTypes";
import { createContext } from "react";
export const showAuthenticationContext = createContext({});

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => [],
  removeFromCart: () => {},
  decrementFromCart: () => {},
});

// export default showAuthenticationContext;
