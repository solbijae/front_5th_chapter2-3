import { useAddComment } from "./useAddComment";
import { useUpdateComment } from "./useUpdateComment";
import { useDeleteComment } from "./useDeleteComment";
import { useLikeComment } from "./useLikeComment";
import { QueryClient } from "@tanstack/react-query";
import { PostCreateCommentRequestBody, CommentDetail } from "../../../config";
export const useCommentHandlers = (
  newComment: PostCreateCommentRequestBody,
  setComments: (comments: Record<number, CommentDetail[]>) => void,
  comments: Record<number, CommentDetail[]>,
  setShowAddCommentDialog: (showAddCommentDialog: boolean) => void,
  setNewComment: (newComment: PostCreateCommentRequestBody) => void,
  selectedComment: CommentDetail | null,
  setShowEditCommentDialog: (showEditCommentDialog: boolean) => void,
  queryClient: QueryClient
) => {
  const addCommentMutation = useAddComment(newComment, setComments, setShowAddCommentDialog, setNewComment, queryClient);
  const updateCommentMutation = useUpdateComment(selectedComment, setComments, setShowEditCommentDialog, queryClient);
  const deleteCommentMutation = useDeleteComment(setComments, queryClient);
  const likeCommentMutation = useLikeComment(comments, setComments, queryClient);

  // 댓글 추가
  const addComment = () => {
    addCommentMutation.mutate();
  };

  // 댓글 업데이트
  const updateComment = () => {
    updateCommentMutation.mutate();
  };

  // 댓글 삭제
  const deleteComment = (id: number, postId: number) => {
    deleteCommentMutation.mutate({ id, postId });
  };

  // 댓글 좋아요
  const likeComment = (id: number, postId: number) => {
    likeCommentMutation.mutate({ id, postId });
  };

  return { addComment, updateComment, deleteComment, likeComment };
}