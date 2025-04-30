import { Post, User } from "../../../config";

// posts에 user 정보 추가
export const mergePostsAndUsers = (posts: Post[], users: User[]) => {
  return posts.map((post) => ({
    ...post,
    author: users.find((user) => user.id === post.userId),
  }))
}