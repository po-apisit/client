import { IHeroRequest } from "./IHeroRequest";

export interface IHeroResponse extends IHeroRequest {
    _id?: string;
    fileImage?: File;
    fileImageCover?: File;
    createdAt?: Date;
    updatedAt?: Date;
}