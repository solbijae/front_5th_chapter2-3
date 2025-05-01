import { Post } from "@/entities/post/config/post"
import { User } from "@/entities/user/config/user"

// posts에 user 정보 추가
export const mergePostsAndUsers = (posts: Post[], users: User[]) => {
  return posts.map((post) => ({
    ...post,
    author: users.find((user) => user.id === post.userId),
  }))
}
