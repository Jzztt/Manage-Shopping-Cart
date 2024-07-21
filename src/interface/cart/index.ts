import { ICartItem } from "@/context/ShoppingCartContext";
import { IResponse } from "../baseTemplate";
import { IProductDetailInfo } from "../product";

export interface ICartInfo {
    _id: number;
    user: number;
    products: ICartItem[];
    total: number;
}


export interface IAddToCartRequest {
    products: IProductDetailInfo[];
    userId: string;
}
export interface IIncreaseCartQuantityResponse extends IResponse {
    data: ICartInfo | null;
}

export interface IDecreaseCartQuantityResponse extends IIncreaseCartQuantityResponse {}

export interface IRemoveFromCartResponse extends IIncreaseCartQuantityResponse {}

export interface ICartResponse extends IResponse {
    data: ICartInfo[] | null;
}

