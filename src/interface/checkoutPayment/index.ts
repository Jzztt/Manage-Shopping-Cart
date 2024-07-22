import { IFormCheckoutData } from "@/components/molecules/ShoppingCheckout";
import { IResponse } from "../baseTemplate";

export interface ISendCheckoutPaymentRequest {
    checkoutInfo: IFormCheckoutData;
    orderId: string
}

export interface ICheckoutPaymentResponse extends IResponse {

}