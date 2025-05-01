import { useQuery } from "@tanstack/react-query"
import { fetchSearchPostsData } from "@/entities/post/api/post"
import { STALE_TIME, GC_TIME, RETRY_COUNT } from "@/app/config/cache"

// 검색 결과 가져오기
export const useGetSearchQuery = (searchQuery: string) => {
  return useQuery({
    queryKey: ["posts", "search", searchQuery],
    queryFn: () => fetchSearchPostsData(searchQuery),
    enabled: !!searchQuery,
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
    retry: RETRY_COUNT,
    refetchOnWindowFocus: false,
  })
}
