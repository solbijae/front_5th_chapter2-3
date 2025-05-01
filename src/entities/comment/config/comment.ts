export interface CommentUser {
  id: number
  username: string
  fullName: string
}

export type CommentDetail = {
  id: number
  body: string
  postId: number
  likes: number
  user: CommentUser
}

export type GetComment = {
  comments: CommentDetail[]
  total: number
  skip: number
  limit: number
}

export type PostCreateCommentRequestBody = Pick<CommentDetail, "body" | "postId"> & { userId: number }

export type DeleteCommentRequestParams = Pick<CommentDetail, "id" | "postId">

export type PutUpdateCommentRequestBody = Pick<CommentDetail, "id" | "body">

export type PatchLikeCommentRequestBody = {
  id: number
  postId: number
}
