import { useQuery } from "@tanstack/react-query"
import { fetchTagsData } from "@/entities/post/api/post"
import { STALE_TIME, GC_TIME, RETRY_COUNT } from "@/app/config/cache"

export const useGetTagQuery = () => {
  return useQuery({
    queryKey: ["tags"],
    queryFn: fetchTagsData,
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
    retry: RETRY_COUNT,
    refetchOnWindowFocus: false,
  })
}
