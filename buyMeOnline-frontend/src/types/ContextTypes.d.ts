export type CartItem = {
  id: number;
  category: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export type ProductType = {
  id: number;
  category: string;
  title: string;
  description: string;
  price: number;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export type CartContextType = {
  cart: cartItem[] | [];
  addToCart: (CartItem) => void;
  removeFromCart: (number) => void;
  decrementFromCart: (number) => void;
};
