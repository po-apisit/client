import { ICategoryItemRequest } from "./ICategoryItemRequest";

export interface ICategoryItemResponse extends ICategoryItemRequest {
    _id?: string;
    createdAt?: Date;
    updatedAt?: Date;
}