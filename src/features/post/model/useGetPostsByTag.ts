import { useQuery } from "@tanstack/react-query"
import { fetchPostsByTagData } from "@/entities/post/api/post"
import { fetchUsersData } from "@/entities/user/api/user"
import { STALE_TIME, GC_TIME, RETRY_COUNT } from "@/app/config/cache"

export const useGetPostsByTag = (selectedTag: string) => {
  return useQuery({
    queryKey: ["posts", "tag", selectedTag],
    queryFn: async () => {
      const [postsResponse, usersResponse] = await Promise.all([fetchPostsByTagData(selectedTag), fetchUsersData()])
      return { postsData: postsResponse, usersData: usersResponse }
    },
    enabled: !!selectedTag && selectedTag !== "all",
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
    retry: RETRY_COUNT,
    refetchOnWindowFocus: false,
  })
}
