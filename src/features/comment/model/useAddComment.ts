import { QueryClient, useMutation } from "@tanstack/react-query"
import { handleError } from "@/shared/lib/queryError"
import { invalidateQueries } from "@/shared/lib/queryInvalidate"
import { fetchAddCommentData } from "@/entities/comment/api/comment"
import { PostCreateCommentRequestBody, CommentDetail } from "@/entities/comment/config/comment"

export const useAddComment = (
  newComment: PostCreateCommentRequestBody,
  comments: Record<number, CommentDetail[]>,
  setComments: (comments: Record<number, CommentDetail[]>) => void,
  setShowAddCommentDialog: (show: boolean) => void,
  setNewComment: (comment: PostCreateCommentRequestBody) => void,
  queryClient: QueryClient,
) => {
  return useMutation({
    mutationFn: () => fetchAddCommentData(newComment),
    onSuccess: (data) => {
      const currentComments = comments || {}
      const updatedComments: Record<number, CommentDetail[]> = {
        ...currentComments,
        [data.postId]: [...(currentComments[data.postId] || []), data],
      }
      setComments(updatedComments)
      setShowAddCommentDialog(false)
      setNewComment({ body: "", postId: 0, userId: 1 })
      invalidateQueries(queryClient, ["comments"])
    },
    onError: handleError,
  })
}
