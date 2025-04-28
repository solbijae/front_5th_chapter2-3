import { User } from "./user";

export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  userId: number;
  author?: User;
}

export interface PostsResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
} 