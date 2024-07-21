import { IProductProps } from "@/components/molecules";
import { CartService } from "@/services/cart";
import { createContext, useContext, useEffect, useState } from "react";
interface IShoppingCartProviderProps {
  children: React.ReactNode;
}

interface IShoppingCartContext {
  cartItems: ICartItem[];
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (item: number) => number;
  increaseCartQuantity: (userId: string, products: IProductProps[]) => void;
  decreaseCartQuantity: (orderId: string, productId: string) => void;
  removeFromCart: (orderId: string, productId: string) => void;
  cartQuantity: number;
  isOpen: boolean;
  totalCost: number;
}
export interface ICartItem {
  _id: number;
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
    return cartItems.find((item) => item._id === id)?.quantity || 0;
  };
  const increaseCartQuantity = async (
    userId: string,
    products: IProductProps[]
  ) => {
    // setCartItems((currItems) => {
    //   if (currItems.find((item) => item._id === product._id) == null) {
    //     return [...currItems, { ...product, quantity: 1 }];
    //   } else {
    //     return currItems.map((item) => {
    //       if (item._id === product._id) {
    //         return { ...item, quantity: item.quantity + 1 };
    //       } else {
    //         return item;
    //       }
    //     });
    //   }
    // });
    const increaseCartQuantityResponse = await CartService.increaseCartQuantity(
      userId,
      products
    );
    if (increaseCartQuantityResponse?.data) {
      setCartItems(increaseCartQuantityResponse?.data.products);
    }
  };

  const decreaseCartQuantity = async (orderId: string, productId: string) => {
    // setCartItems((currItems) => {
    //   if (currItems.find((item) => item._id === product._id)?.quantity === 1) {
    //     return currItems.filter((item) => item._id !== product._id);
    //   } else {
    //     return currItems.map((item) => {
    //       if (item._id === product._id) {
    //         return { ...item, quantity: item.quantity - 1 };
    //       } else {
    //         return item;
    //       }
    //     });
    //   }
    // });
    const decreaseCartQuantityResponse = await CartService.decreaseCartQuantity(
      orderId,
      productId
    );

    if (decreaseCartQuantityResponse?.data) {
      setCartItems(decreaseCartQuantityResponse?.data.products);
    }
  };
  const removeFromCart = async (orderId: string, productId: string) => {
    const removeFromCartResponse = await CartService.removeFromCart(
      orderId,
      productId
    );
    if (removeFromCartResponse?.data) {
      setCartItems(removeFromCartResponse?.data.products);
    }

    // setCartItems((currItems) => {
    //   return currItems.filter((item) => item._id !== id);
    // });
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
