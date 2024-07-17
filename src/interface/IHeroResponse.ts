export interface IHeroResponse {
    _id: string;
    name: string;
    aliases: string;
    image: string;
    image_cover: string;
    description: string;
    story: string;
    categoryId: string;
    skills: string[];
    itemsId: string[];
    public: "private" | "public"
    createdAt: Date;
    updatedAt: Date;
}