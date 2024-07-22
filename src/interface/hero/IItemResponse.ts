import { IItemRequest } from "./IItemRequest";

export interface IItemResponse extends IItemRequest {
    _id?: string;
    fileImage?: File;
    createdAt?: Date;
    updatedAt?: Date;
}