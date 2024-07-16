export interface IUser {
    _id: string;
    name: string;
    url_profile: string;
    phone: string;
    verify_phone: "pending" | "vefified";
    email: string;
    verify_email: "pending" | "vefified" ;
    image_profile: string;
    image_cover: string;
    role_user: "user" | "superuser" | "advert" | "officer" | "admin" | "superadmin";
    createdAt: Date;
    updatedAt: Date;
}