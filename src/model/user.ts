import { post } from "./post";

export type user = {
    id: string;
    name: string;
    password: string;
    createdAt: Date;
    posts: post[];
}
