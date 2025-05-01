import { QueryClient, useMutation } from "@tanstack/react-query";
import { handleError } from "@/shared/lib/queryError";
import { invalidateQueries } from "@/shared/lib/queryInvalidate";
import { fetchDeletePostData } from "@/entities/post/api/post";
import { Post } from "@/entities/post/config/post";

export const useDeletePost = (
  setPosts: (posts: Post[]) => void,
  posts: Post[],
  queryClient: QueryClient
) => {
  return useMutation({
    mutationFn: fetchDeletePostData,
    onSuccess: (_, id) => {
      setPosts(posts.filter((post) => post.id !== id));
      invalidateQueries(queryClient, ['posts']);
    },
    onError: handleError
  });
}
