import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Heart, ShoppingCart } from "lucide-react";
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
    increaseCartQuantity,
  } = useShoppingCart();

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
            <Button
              onClick={() => increaseCartQuantity("669cb03364032239f8c2c5c4", _id.toString())}
              className="flex col-span-7 gap-4"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </Button>
      </CardFooter>
    </Card>
  );
};

export default Product;
