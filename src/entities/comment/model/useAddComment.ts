import { QueryClient, useMutation } from '@tanstack/react-query';
import { handleError } from '../../../shared/lib/queryError';
import { invalidateQueries } from '../../../shared/lib/queryInvalidate';
import { fetchAddCommentData } from '../api/comment';
import { PostCreateCommentRequestBody, CommentDetail } from '../../../config';

export const useAddComment = (
  newComment: PostCreateCommentRequestBody,
  setComments: (comments: Record<number, CommentDetail[]>) => void,
  setShowAddCommentDialog: (show: boolean) => void,
  setNewComment: (comment: PostCreateCommentRequestBody) => void,
  queryClient: QueryClient
) => {
  return useMutation({
    mutationFn: () => fetchAddCommentData(newComment),
    onSuccess: (data) => {
      const currentComments = queryClient.getQueryData<Record<number, CommentDetail[]>>(['comments']) || {};
      const updatedComments: Record<number, CommentDetail[]> = {
        ...currentComments,
        [data.postId]: [...(currentComments[data.postId] || []), data],
      };
      setComments(updatedComments);
      setShowAddCommentDialog(false);
      setNewComment({ body: "", postId: 0, userId: 1 });
      invalidateQueries(queryClient, ['comments']);
    },
    onError: handleError
  });
}
