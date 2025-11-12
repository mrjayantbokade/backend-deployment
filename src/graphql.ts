
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface Comment {
    id: number;
    postId: number;
    text: string;
    author: string;
}

export interface IQuery {
    comments(postId?: Nullable<number>): Comment[] | Promise<Comment[]>;
    posts(): Post[] | Promise<Post[]>;
    post(id: number): Nullable<Post> | Promise<Nullable<Post>>;
}

export interface IMutation {
    addComment(postId: number, text: string, author: string): Comment | Promise<Comment>;
    createPost(title: string, content: string, author: string): Post | Promise<Post>;
    deletePost(id: number): boolean | Promise<boolean>;
}

export interface Post {
    id: number;
    title: string;
    content: string;
    author: string;
}

type Nullable<T> = T | null;
