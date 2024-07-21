import { IAddToCartRequest, ICartResponse, IDecreaseCartQuantityResponse, IIncreaseCartQuantityResponse, IRemoveFromCartResponse } from "@/interface/cart";
import { CustomAxios } from "@/ultis/customAxios";
import { handleAxiosError } from "@/ultis/handleAxiosError";

const increaseCartQuantity = async (userId: string, productId: string) => {
    try {
        const payload: IAddToCartRequest = { productId, userId: '669cb03364032239f8c2c5c4' };
        const { data } = await CustomAxios.post<IIncreaseCartQuantityResponse>("/orders", payload);
        return data;
    } catch (error) {
        handleAxiosError(error);
    }
};

const decreaseCartQuantity = async (orderId: string, productId: string) => {
    try {
        const { data } = await CustomAxios.put<IDecreaseCartQuantityResponse>(`/orders/${orderId}/products/${productId}`);

        return data;
    } catch (error) {
        handleAxiosError(error);
    }
};


const removeFromCart = async (orderId: string, productId: string) => {
    try {
        const { data } = await CustomAxios.delete<IRemoveFromCartResponse>(`/orders/${orderId}/products/${productId}`,);
        return data;
    } catch (error) {
        handleAxiosError(error);
    }
}
const getCart = async () => {
    try {
        const { data } = await CustomAxios.get<ICartResponse>("/orders");
        return data;

    } catch (error) {
        handleAxiosError(error);
    }
}
export const CartService = {
    increaseCartQuantity,
    decreaseCartQuantity,
    getCart,
    removeFromCart,
}