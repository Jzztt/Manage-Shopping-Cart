import { IFormCheckoutData } from "@/components/molecules/ShoppingCheckout";
import { ICheckoutPaymentResponse, ISendCheckoutPaymentRequest } from "@/interface/checkoutPayment";
import { CustomAxios } from "@/ultis/customAxios";
import { handleAxiosError } from "@/ultis/handleAxiosError";

const sendCheckoutPayment = async (checkoutInfo: IFormCheckoutData, orderId: string) => {
    try {
        const payload: ISendCheckoutPaymentRequest = { checkoutInfo, orderId };
        const { data } = await CustomAxios.post<ICheckoutPaymentResponse>("/payment/checkout", payload);
        return data;
    } catch (error) {
        handleAxiosError(error);
    }
};
export const checkoutPaymentService = {
    sendCheckoutPayment,
}