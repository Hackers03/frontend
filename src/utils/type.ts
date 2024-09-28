import type { User } from "@/redux/features/authApiSlice";

export interface postType {
    id: number,
    author: ProfileType,
    category: string,
    parent_post:number,
    tags: tagType[],
    title: string,
    details: string,
    created: string,
    updated: string,
};


export interface voteType {
    id: number,
    author: number,
    post: number,
    type: string,
    created: string, 
    updated: string,
}


export interface tagType {
    name: string;
    description: string ;
}

export interface ProfileType {
    user: User,
    photo: string | null,
    reputation: number,
    bio: string | null,
    confirmed: boolean,
    updated: string,
}


export interface categoryType {
    name: string;
    description: string;
}

export interface userType {
    id: number;
    nickname: string;
    email: string;
    last_login: string;

}

export interface conversationtype {
    id: string;
    users: User[];
}

export interface messageType {
    id: string;
    name: string;
    body: string;
    conversationId: string;
    sent_to: User;
    author: User;
}