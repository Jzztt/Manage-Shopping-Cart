import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Heart, Minus, Plus, ShoppingCart } from "lucide-react";
import { useShoppingCart } from "@/context/ShoppingCartContext";
import { formatCurrency } from "@/ultis/formatCurrency";

export interface IProductProps {
  _id: number;
  name: string;
  cost: number;
  price: number;
  image: string;
  description: string;
}
const Product = (props: IProductProps) => {
  const { _id, name, cost, price, image, description } = props;
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  const quantityProductInCart = getItemQuantity(_id);
  const orderId = "669cd5efc3b258d973f7bf94";

  return (
    <Card>
      <img
        src={image}
        alt="Nike Air Max 2019"
        className="w-full h-[300px] rounded-t-sm"
      />
      <CardContent>
        <div className="h-[168px]">
          <h3 className="py-4 font-bold ">{name}</h3>
          <p className="h-12">{description}</p>
          <p className="py-2 font-semibold line-through">
            {formatCurrency(cost)}
          </p>
          <p className="font-semibold">{formatCurrency(price)}</p>
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-10 gap-2.5 ">
        <Button className="col-span-3">
          {" "}
          <Heart className="w-4 h-4" />
        </Button>
        {quantityProductInCart === 0 ? (
          <>
            <Button
              onClick={() => increaseCartQuantity("1", [props])}
              className="flex col-span-7 gap-4"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </Button>
          </>
        ) : (
          <div className="grid items-center justify-center h-10 grid-cols-3 col-span-7 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
            <button
              onClick={() => decreaseCartQuantity(orderId, _id.toString())}
            >
              <Minus className="w-full h-10 p-3 border-r-2 border-gray-500 " />
            </button>
            <span className="flex items-center justify-center ">
              {quantityProductInCart}
            </span>
            <button onClick={() => increaseCartQuantity("1", [props])}>
              <Plus className="w-full h-10 p-3 border-l-2 border-gray-500" />
            </button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default Product;
