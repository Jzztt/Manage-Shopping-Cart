import { ICart } from "@/interface/cart";
import { CartService } from "@/services/cart";
import { createContext, useContext, useEffect, useState } from "react";
interface IShoppingCartProviderProps {
  children: React.ReactNode;
}

interface IShoppingCartContext {
  cartItems: ICart[];
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (item: number) => number;
  increaseCartQuantity: (userId: string, productId: string) => void;
  decreaseCartQuantity: (orderId: string, productId: string) => void;
  removeFromCart: (orderId: string, productId: string) => void;
  cartQuantity: number;
  isOpen: boolean;
  totalCost: number;
}
export interface ICartItem {
  _id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  cost: number;
}

const ShoppingCartContext = createContext({} as IShoppingCartContext);
const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};

const ShoppingCartProvider = ({ children }: IShoppingCartProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<ICart[]>([]);

  const cartQuantity = cartItems.reduce(
    (quantity, item) => quantity + item.quantity,
    0
  );
  const totalCost = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const getItemQuantity = (id: number) => {
   return cartItems.find((item) => item.product._id === id)?.quantity || 0
  };
  const increaseCartQuantity = async (
    userId: string,
    productId: string,
  ) => {
    const increaseCartQuantityResponse = await CartService.increaseCartQuantity(
      userId,
      productId
    );
    if (increaseCartQuantityResponse?.data) {

      setCartItems(increaseCartQuantityResponse?.data[0].products);
    }
  };

  const decreaseCartQuantity = async (orderId: string, productId: string) => {
    const decreaseCartQuantityResponse = await CartService.decreaseCartQuantity(
      orderId,
      productId
    );

    if (decreaseCartQuantityResponse?.data) {

      setCartItems(decreaseCartQuantityResponse?.data[0].products);
    }
  };
  const removeFromCart = async (orderId: string, productId: string) => {
    const removeFromCartResponse = await CartService.removeFromCart(
      orderId,
      productId
    );
    if (removeFromCartResponse?.data) {
      setCartItems(removeFromCartResponse?.data[0].products);
    }
  };

  useEffect(() => {
    const fetchCart = async () => {
      const response = await CartService.getCart();

      if (response?.data && response?.data.length > 0) {
        setCartItems(response?.data[0].products);
      }
    };
    fetchCart();
  }, []);

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
        totalCost,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export { ShoppingCartContext, useShoppingCart, ShoppingCartProvider };
