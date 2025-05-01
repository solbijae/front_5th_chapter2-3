import { create } from 'zustand';
import { Post, GetTag } from '../../config';

interface PostsState {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
  selectedPost: Post | null;
  tags: GetTag[];
  setPosts: (posts: Post[]) => void;
  setTotal: (total: number) => void;
  setSkip: (skip: number) => void;
  setLimit: (limit: number) => void;
  setSelectedPost: (selectedPost: Post | null) => void;
  setTags: (tags: GetTag[]) => void;
}

export const usePostsStore = create<PostsState>((set) => ({
  posts: [],
  total: 0,
  skip: parseInt(new URLSearchParams(window.location.search).get("skip") || "0"),
  limit: parseInt(new URLSearchParams(window.location.search).get("limit") || "10"),
  selectedPost: null,
  tags: [],
  setPosts: (posts) => set({ posts }),
  setTotal: (total) => set({ total }),
  setSkip: (skip) => set({ skip }),
  setLimit: (limit) => set({ limit }),
  setSelectedPost: (selectedPost) => set({ selectedPost }),
  setTags: (tags) => set({ tags }),
}));