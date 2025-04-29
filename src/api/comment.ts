import { fetchInstance } from '../lib/fetchInstance';
import { GetComment, CommentDetail, PostCreateCommentRequestBody, PutUpdateCommentRequestBody } from '../config';
const BASE_URL = "/api/comments";

// API: 댓글 가져오기
export const fetchCommentsData = async (postId: number): Promise<GetComment> => {
  return await fetchInstance(`${BASE_URL}/post/${postId}`);
}

// API: 댓글 추가
export const fetchAddCommentData = async (newComment: PostCreateCommentRequestBody): Promise<CommentDetail> => {
  return await fetchInstance(`${BASE_URL}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newComment),
  });
}

// API: 댓글 업데이트
export const fetchUpdateCommentData = async (selectedComment: CommentDetail | null): Promise<CommentDetail> => {
  return await fetchInstance(`${BASE_URL}/${selectedComment?.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ body: selectedComment?.body } as PutUpdateCommentRequestBody),
  });
}

// API: 댓글 삭제
export const fetchDeleteCommentData = async (id: number): Promise<CommentDetail> => {
  return await fetchInstance(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
}

// API: 댓글 좋아요
export const fetchLikeCommentData = async (id: number, currentLikes: number): Promise<CommentDetail> => {
  return await fetchInstance(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ likes: currentLikes + 1 }),
  });
}