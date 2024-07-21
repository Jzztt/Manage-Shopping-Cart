import { IResponse } from "../baseTemplate";

export interface IProductDetailInfo {
    _id: number;
    name: string;
    cost: number;
    description: string;
    price: number;
    image: string;
}

export interface IProductResponse extends IResponse {
    data: IProductDetailInfo[] | null;
}