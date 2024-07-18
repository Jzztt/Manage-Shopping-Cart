import Product from "@/components/molecules/Product";
import React from "react";

const ListProduct = () => {
  const products = [
    {
      id: 1,
      status: "bestseller",
      name: "Nike Air Max 2019",
      description: "Women's Road Running Shoes",
      slug: "nike-air-max-2019",
      quantity: 10,
      cost: 20000,
      price: 18000,
      color: "white",
      image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8a9db44d-ee3b-42ab-88ea-2c48d37bc9ba/pegasus-41-blueprint-road-running-shoes-9ln3lK.png",
    },
    {
      id: 2,
      status: "new",
      name: "Adidas Stan Smith",
      description: "Women's Road Running Shoes",
      slug: "adidas-stan-smith",
      quantity: 5,
      cost: 30000,
      price: 25000,
      color: "black",
      image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/5fb3198a-cb5d-447e-9c5e-95644cdd88b4/pegasus-41-blueprint-older-road-running-shoes-Dgghd5.png",
    },
    {
      id: 3,
      status: "new",
      name: "Adidas Stan Smith",
      description: "Women's Road Running Shoes",
      slug: "adidas-stan-smith",
      quantity: 5,
      cost: 30000,
      price: 25000,
      color: "black",
      image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/902bf0f3-9a22-4cd0-8c95-231c0b0fa8de/pegasus-41-road-running-shoes-tVfmVc.png",
    },
    {
      id: 4,
      status: "new",
      name: "Adidas Stan Smith",
      description: "Women's Road Running Shoes",
      slug: "adidas-stan-smith",
      quantity: 5,
      cost: 30000,
      price: 25000,
      color: "black",
      image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/64f06a61-99e2-4839-b707-02c37482e1e2/pegasus-41-road-running-shoes-NW3xHb.png",
    },
  ];
  return (
    <>
      <div className="container mx-auto">
        <div className="py-4">
          <h3 className="text-2xl font-bold text-gray-800 ">List Product</h3>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <Product key={product.id} {...product} />
          ))}
        </div>
      </div>
    </>
  );
};

export { ListProduct };
