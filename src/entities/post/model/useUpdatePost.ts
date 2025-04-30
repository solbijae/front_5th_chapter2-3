import { QueryClient, useMutation } from "@tanstack/react-query";
import { handleError } from "../../../shared/lib/queryError";
import { invalidateQueries } from "../../../shared/lib/queryInvalidate";
import { fetchUpdatePostData } from "../api/post";
import { Post } from "../../../config";

export const useUpdatePost = (
  selectedPost: Post | null,
  setPosts: (posts: Post[]) => void,
  posts: Post[],
  setShowEditDialog: (show: boolean) => void,
  queryClient: QueryClient
) => {
  return useMutation({
    mutationFn: () => fetchUpdatePostData(selectedPost),
    onSuccess: (data) => {
      setPosts(posts.map((post) => (post.id === data.id ? data : post)));
      setShowEditDialog(false);
      invalidateQueries(queryClient, ['posts']);
    },
    onError: handleError
  });
}
