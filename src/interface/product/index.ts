import { IResponse } from "../baseTemplate";

export interface IProductDetailInfo {
    id: number;
    name: string;
    description: string;
    price: number;
    Image: string;
}

export interface IProductResponse extends IResponse {
    data?: IProductDetailInfo | null;
}