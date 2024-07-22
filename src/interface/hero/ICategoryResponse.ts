import { ICategoryRequest } from "./ICategoryRequest";

export interface ICategoryResponse extends ICategoryRequest {
    _id?: string;
    createdAt?: Date;
    updatedAt?: Date;
}