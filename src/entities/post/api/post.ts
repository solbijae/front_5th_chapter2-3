import { fetchInstance } from "@/shared/api/fetchInstance"
import { GetPostList, GetTag, PostCreateRequestBody, Post, PostUpdateRequestBody } from "@/entities/post/config/post"
const BASE_URL = "/api/posts"

// API: 게시물 데이터 가져오기
export const fetchPostsData = async (limit: number, skip: number): Promise<GetPostList> => {
  return await fetchInstance(`${BASE_URL}?limit=${limit}&skip=${skip}`)
}

// API: 태그 데이터 가져오기
export const fetchTagsData = async (): Promise<GetTag[]> => {
  return await fetchInstance(`${BASE_URL}/tags`)
}

// API: 검색 결과 가져오기
export const fetchSearchPostsData = async (searchQuery: string): Promise<GetPostList> => {
  return await fetchInstance(`${BASE_URL}/search?q=${searchQuery}`)
}

// API: 태그별 게시물 가져오기
export const fetchPostsByTagData = async (tag: string): Promise<GetPostList> => {
  return await fetchInstance(`${BASE_URL}/tag/${tag}`)
}

// API: 게시물 추가
export const fetchAddPostData = async (newPost: PostCreateRequestBody): Promise<Post> => {
  return await fetchInstance(`${BASE_URL}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  })
}

// API: 게시물 삭제
export const fetchDeletePostData = async (id: number): Promise<Post> => {
  return await fetchInstance(`${BASE_URL}/${id}`, {
    method: "DELETE",
  })
}

// API: 게시물 업데이트
export const fetchUpdatePostData = async (selectedPost: PostUpdateRequestBody | null): Promise<Post> => {
  const body = JSON.stringify(selectedPost)
  return await fetchInstance(`${BASE_URL}/${selectedPost?.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body,
  })
}
