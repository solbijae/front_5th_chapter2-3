import { QueryClient, useMutation } from '@tanstack/react-query';
import { handleError } from '../../../shared/lib/queryError';
import { invalidateQueries } from '../../../shared/lib/queryInvalidate';
import { CommentDetail, DeleteCommentRequestParams } from '../../../config';
import { fetchDeleteCommentData } from '../api/comment';

export const useDeleteComment = (
  setComments: (comments: Record<number, CommentDetail[]>) => void,
  queryClient: QueryClient
) => {
  return useMutation({
    mutationFn: ({ id }: DeleteCommentRequestParams) => fetchDeleteCommentData(id),
    onSuccess: (_, variables) => {
      const currentComments = queryClient.getQueryData<Record<number, CommentDetail[]>>(['comments']) || {};
      const updatedComments: Record<number, CommentDetail[]> = {
        ...currentComments,
        [variables.postId]: currentComments[variables.postId].filter((comment: CommentDetail) => 
          comment.id !== variables.id
        ),
      };
      setComments(updatedComments);
      invalidateQueries(queryClient, ['comments']);
    },
    onError: handleError
  });
}
