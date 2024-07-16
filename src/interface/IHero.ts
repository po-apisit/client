import { ISkillHero } from "./ISkillHero";

export interface IHero {
    _id: string;
    name: string;
    aliases: string;
    image: string;
    description: string;
    story: string;
    categoryId: string;
    skills: ISkillHero[];
    itemsId: string[];
    createdAt: Date;
    updatedAt: Date;
}