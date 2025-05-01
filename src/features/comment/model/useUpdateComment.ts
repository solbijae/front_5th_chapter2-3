import { QueryClient, useMutation } from "@tanstack/react-query"
import { handleError } from "@/shared/lib/queryError"
import { invalidateQueries } from "@/shared/lib/queryInvalidate"
import { fetchUpdateCommentData } from "@/entities/comment/api/comment"
import { CommentDetail } from "@/entities/comment/config/comment"

export const useUpdateComment = (
  selectedComment: CommentDetail | null,
  comments: Record<number, CommentDetail[]>,
  setComments: (comments: Record<number, CommentDetail[]>) => void,
  setShowEditCommentDialog: React.Dispatch<React.SetStateAction<boolean>>,
  queryClient: QueryClient,
) => {
  return useMutation({
    mutationFn: () => fetchUpdateCommentData(selectedComment),
    onSuccess: (data) => {
      const currentComments = comments || {}
      const updatedComments: Record<number, CommentDetail[]> = {
        ...currentComments,
        [data.postId]:
          currentComments[data.postId]?.map((comment: CommentDetail) => (comment.id === data.id ? data : comment)) ||
          [],
      }
      setComments(updatedComments)
      setShowEditCommentDialog(false)
      invalidateQueries(queryClient, ["comments"])
    },
    onError: handleError,
  })
}
