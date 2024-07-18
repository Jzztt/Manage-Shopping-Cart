import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Heart, Minus, Plus, ShoppingCart } from "lucide-react";
import { useShoppingCart } from "@/context/ShoppingCartContext";
import { formatCurrency } from "@/ultis/formatCurrency";

export interface IProductProps {
  id: number;
  name: string;
  slug: string;
  quantity: number;
  cost: number;
  price: number;
  color: string;
  image: string;
  status: string;
  description: string;
}
const Product = (props: IProductProps) => {
  const {
    id,
    name,
    cost,
    price,
    image,
    description,
  } = props;
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  const quantityProductInCart = getItemQuantity(id);


  return (
    <Card>
      <img
        src={image}
        alt="Nike Air Max 2019"
        className="w-full h-[300px] rounded-t-sm"
      />
      <CardContent>
        <h3 className="py-4 font-bold ">{name}</h3>
        <p>{description}</p>
        <p className="py-2 font-semibold line-through">{formatCurrency(cost)}</p>
        <p className="font-semibold">{formatCurrency(price)}</p>
      </CardContent>
      <CardFooter className="grid grid-cols-10 gap-2.5 ">
        <Button className="col-span-3">
          {" "}
          <Heart className="w-4 h-4" />
        </Button>
        {quantityProductInCart === 0 ? (
          <>
            <Button
              onClick={() => increaseCartQuantity(props)}
              className="flex col-span-7 gap-4"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </Button>
          </>
        ) : (
          <div className="grid items-center justify-center h-10 grid-cols-3 col-span-7 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
            <button onClick={() => decreaseCartQuantity(props)}>
              <Minus className="w-full h-10 p-3 border-r-2 border-gray-500 " />
            </button>
            <span className="flex items-center justify-center ">{quantityProductInCart}</span>
            <button onClick={() => increaseCartQuantity(props)}>
              <Plus className="w-full h-10 p-3 border-l-2 border-gray-500" />
            </button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default Product;
