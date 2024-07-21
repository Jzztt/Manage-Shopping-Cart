import { ICartItem } from "@/context/ShoppingCartContext";
import { IResponse } from "../baseTemplate";

export interface ICart {
    _id: string,
    product :ICartItem,
    quantity: number,
}
export interface ICartInfo {
    _id: number;
    user: number;
    products: ICart[];
    total: number;
}



export interface IAddToCartRequest {
    productId: string;
    userId: string;
}
export interface IIncreaseCartQuantityResponse extends IResponse {
    data: ICartInfo[] | null;
}

export interface IDecreaseCartQuantityResponse extends IIncreaseCartQuantityResponse { }

export interface IRemoveFromCartResponse extends IIncreaseCartQuantityResponse { }

export interface ICartResponse extends IIncreaseCartQuantityResponse { }
