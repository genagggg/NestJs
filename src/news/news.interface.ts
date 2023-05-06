import { Comment } from "./comments/comments.interface";

export interface News {
    id?: number;
    title: string;
    description: string;
    author?: string;
    countView?: number;
    comments?: Comment[];
    cover?: string;
}

export interface NewsEdit {

    title?: string;
    description?: string;
    author?: string;
    countView?: number;
}

