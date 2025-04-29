import { User } from './user';

export interface RequestParams {
  skip: number;
  limit: number;
}

export interface Reaction {
  likes: number;
  dislikes: number;
}

export interface GetTag {
  slug: string;
  name: string;
  url: string;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: Reaction;
  views: number;
  userId: number;
  author?: User;
}

export type GetPostList = {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}

export type PostCreateRequestBody = Pick<Post, "title" | "body" | "userId">;

export type PostUpdateRequestBody = Pick<Post, "id" | "title" | "body">;
