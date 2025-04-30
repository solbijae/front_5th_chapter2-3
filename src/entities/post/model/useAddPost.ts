import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAddPostData } from "../api/post";
import { handleError } from "../../../shared/lib/queryError";
import { invalidateQueries } from "../../../shared/lib/queryInvalidate";
import { PostCreateRequestBody, Post } from "../../../config";

export const useAddPost = (
  newPost: PostCreateRequestBody,
  setPosts: (posts: Post[]) => void,
  posts: Post[],
  setShowAddDialog: (show: boolean) => void,
  setNewPost: (post: PostCreateRequestBody) => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => fetchAddPostData(newPost),
    onSuccess: (data) => {
      setPosts([data, ...posts]);
      setShowAddDialog(false);
      setNewPost({ title: "", body: "", userId: 1 });
      invalidateQueries(queryClient, ['posts']);
    },
    onError: handleError
  });
}