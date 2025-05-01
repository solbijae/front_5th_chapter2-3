import { QueryClient, useMutation } from "@tanstack/react-query"
import { handleError } from "@/shared/lib/queryError"
import { invalidateQueries } from "@/shared/lib/queryInvalidate"
import { CommentDetail, DeleteCommentRequestParams } from "@/entities/comment/config/comment"
import { fetchDeleteCommentData } from "@/entities/comment/api/comment"

export const useDeleteComment = (
  comments: Record<number, CommentDetail[]>,
  setComments: (comments: Record<number, CommentDetail[]>) => void,
  queryClient: QueryClient,
) => {
  return useMutation({
    mutationFn: ({ id }: DeleteCommentRequestParams) => fetchDeleteCommentData(id),
    onSuccess: (_, { postId, id }) => {
      const currentComments = comments || {}
      const updatedComments: Record<number, CommentDetail[]> = {
        ...currentComments,
        [postId]: currentComments[postId]?.filter((comment: CommentDetail) => comment.id !== id) || [],
      }
      setComments(updatedComments)
      invalidateQueries(queryClient, ["comments"])
    },
    onError: handleError,
  })
}
