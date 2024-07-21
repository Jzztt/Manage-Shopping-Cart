import Product from "@/components/molecules/Product";
import { IProductDetailInfo } from "@/interface/product";
import { ProductService } from "@/services";
import React, { useEffect, useState } from "react";

const ListProduct = () => {
  const [products, setProducts] = useState<IProductDetailInfo[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await ProductService.getProducts();
      if (response?.data) {
        setProducts(response?.data);
      }
    };
    fetchProducts();
  }, []);
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
