export interface IItemRequest {
    name: string;
    image: string;
    description: string;
    categoryId: string;
    public: "public" | "private";
}