import { IProductProps } from "@/components/molecules";
import { createContext, useContext, useState } from "react";
interface IShoppingCartProviderProps {
  children: React.ReactNode;
}

interface IShoppingCartContext {
  cartItems: ICartItem[];
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (item: number) => number;
  increaseCartQuantity: (item: IProductProps) => void;
  decreaseCartQuantity: (item: IProductProps) => void;
  removeFromCart: (item: number) => void;
  cartQuantity: number;
  isOpen: boolean;
  totalCost: number;
}
interface ICartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  cost: number;
  quantity: number;
}

const ShoppingCartContext = createContext({} as IShoppingCartContext);
const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};

const ShoppingCartProvider = ({ children }: IShoppingCartProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  console.log(cartItems);

  const cartQuantity = cartItems.reduce(
    (quantity, item) => quantity + item.quantity,
    0
  );
  const totalCost = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const getItemQuantity = (id: number) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };
  const increaseCartQuantity = (product: IProductProps) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === product.id) == null) {
        return [...currItems, { ...product, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === product.id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const decreaseCartQuantity = (product: IProductProps) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === product.id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== product.id);
      } else {
        return currItems.map((item) => {
          if (item.id === product.id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };
  const removeFromCart = (id: number) => {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
        openCart,
        closeCart,
        isOpen,
        totalCost
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export { ShoppingCartContext, useShoppingCart, ShoppingCartProvider };
