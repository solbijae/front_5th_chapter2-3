import { useAddPost } from "@/features/post/model/useAddPost"
import { useUpdatePost } from "@/features/post/ui/useUpdatePost"
import { useDeletePost } from "@/features/post/model/useDeletePost"
import { QueryClient } from "@tanstack/react-query"
import { PostCreateRequestBody, Post } from "@/entities/post/config/post"
export const usePostHandlers = (
  newPost: PostCreateRequestBody,
  setPosts: (posts: Post[]) => void,
  posts: Post[],
  setShowAddDialog: (showAddDialog: boolean) => void,
  setNewPost: (newPost: PostCreateRequestBody) => void,
  selectedPost: Post | null,
  setShowEditDialog: (showEditDialog: boolean) => void,
  queryClient: QueryClient,
) => {
  const addPostMutation = useAddPost(newPost, setPosts, posts, setShowAddDialog, setNewPost)
  const updatePostMutation = useUpdatePost(selectedPost, setPosts, posts, setShowEditDialog, queryClient)
  const deletePostMutation = useDeletePost(setPosts, posts, queryClient)

  const addPost = () => {
    addPostMutation.mutate()
  }

  const updatePost = () => {
    updatePostMutation.mutate()
  }

  const deletePost = (id: number) => {
    deletePostMutation.mutate(id)
  }

  return { addPost, updatePost, deletePost }
}
