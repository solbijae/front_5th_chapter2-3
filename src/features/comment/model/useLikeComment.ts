import { PatchLikeCommentRequestBody } from "@/entities/comment/config/comment"
import { QueryClient, useMutation } from "@tanstack/react-query"
import { CommentDetail } from "@/entities/comment/config/comment"
import { fetchLikeCommentData } from "@/entities/comment/api/comment"
import { invalidateQueries } from "@/shared/lib/queryInvalidate"
import { handleError } from "@/shared/lib/queryError"

export const useLikeComment = (
  comments: Record<number, CommentDetail[]>,
  setComments: (comments: Record<number, CommentDetail[]>) => void,
  queryClient: QueryClient,
) => {
  return useMutation<CommentDetail, Error, PatchLikeCommentRequestBody>({
    mutationFn: ({ id, postId }) => {
      const currentLikes = comments[postId]?.find((c) => c.id === id)?.likes || 0
      return fetchLikeCommentData(id, currentLikes)
    },
    onSuccess: (data, { postId }) => {
      const currentComments = comments || {}
      const updatedComments: Record<number, CommentDetail[]> = {
        ...currentComments,
        [postId]:
          currentComments[postId]?.map((comment: CommentDetail) =>
            comment.id === data.id ? { ...data, likes: comment.likes + 1 } : comment,
          ) || [],
      }
      setComments(updatedComments)
      invalidateQueries(queryClient, ["comments"])
    },
    onError: handleError,
  })
}
