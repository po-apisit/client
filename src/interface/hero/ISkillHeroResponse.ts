import { ISkillHeroRequest } from "./ISkillHeroRequest";

export interface ISkillHeroResponse extends ISkillHeroRequest {
        _id?: string;
        createdAt?: Date;
        file?: File
        updatedAt?: Date;
}