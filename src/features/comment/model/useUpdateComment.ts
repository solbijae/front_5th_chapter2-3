import { QueryClient, useMutation } from '@tanstack/react-query';
import { handleError } from '@/shared/lib/queryError';
import { invalidateQueries } from '@/shared/lib/queryInvalidate';
import { fetchUpdateCommentData } from '@/entities/comment/api/comment';
import { CommentDetail } from '@/entities/comment/config/comment';

export const useUpdateComment = (
  selectedComment: CommentDetail | null,
  setComments: (comments: Record<number, CommentDetail[]>) => void,
  setShowEditCommentDialog: (show: boolean) => void,
  queryClient: QueryClient
) => {
  return useMutation({
    mutationFn: () => fetchUpdateCommentData(selectedComment),
    onSuccess: (data) => {
      const currentComments = queryClient.getQueryData<Record<number, CommentDetail[]>>(['comments']) || {};
      const updatedComments: Record<number, CommentDetail[]> = {
        ...currentComments,
        [data.postId]: currentComments[data.postId].map((comment: CommentDetail) => 
          comment.id === data.id ? data : comment
        ),
      };
      setComments(updatedComments);
      setShowEditCommentDialog(false);
      invalidateQueries(queryClient, ['comments']);
    },
    onError: handleError
  });
}
