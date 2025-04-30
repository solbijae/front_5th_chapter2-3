import { useAddPost } from "./useAddPost";
import { useUpdatePost } from "./useUpdatePost";
import { useDeletePost } from "./useDeletePost";
import { QueryClient } from "@tanstack/react-query";
import { PostCreateRequestBody, Post } from "../../../config";
export const usePostHandlers = (
  newPost: PostCreateRequestBody,
  setPosts: (posts: Post[]) => void,
  posts: Post[],
  setShowAddDialog: (showAddDialog: boolean) => void,
  setNewPost: (newPost: PostCreateRequestBody) => void,
  selectedPost: Post | null,
  setShowEditDialog: (showEditDialog: boolean) => void,
  queryClient: QueryClient
) => {
  const addPostMutation = useAddPost(newPost, setPosts, posts, setShowAddDialog, setNewPost);
  const updatePostMutation = useUpdatePost(selectedPost, setPosts, posts, setShowEditDialog, queryClient);
  const deletePostMutation = useDeletePost(setPosts, posts, queryClient);

  const addPost = () => {
    addPostMutation.mutate();
  };

  const updatePost = () => {
    updatePostMutation.mutate();
  };

  const deletePost = (id: number) => {
    deletePostMutation.mutate(id);
  };

  return { addPost, updatePost, deletePost };
};
