import { IUserRequest } from "./IUserRequest";

export interface IUserResponse extends IUserRequest {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    _v: number;
}