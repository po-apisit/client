export interface IHeroRequest {
    name: string;
    aliases: string;
    description: string;
    image: string;
    image_cover: string;
    story: string;
    categoryId: string;
    skills: string[];
    itemsId: string[];
    public: "private" | "public"
}