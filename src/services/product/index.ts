import { IProductResponse } from "@/interface/product";
import { CustomAxios } from "@/ultis/customAxios";
import { handleAxiosError } from "@/ultis/handleAxiosError";
const getProducts = async () => {
  try {
    const { data } = await CustomAxios.get<IProductResponse>("/products");
    return data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const ProductService = {
  getProducts,
};
