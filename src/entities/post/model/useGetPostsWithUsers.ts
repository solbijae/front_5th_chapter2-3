import { useQuery } from "@tanstack/react-query";
import { fetchPostsData } from "../api/post";
import { fetchUsersData } from "../../user/api/user";
import { STALE_TIME, GC_TIME, RETRY_COUNT } from "../../../config";

// 게시물 데이터 가져오기
export const usePostsWithUsersQuery = (
  skip: number,
  limit: number,
  searchQuery: string,
  sortBy: string,
  sortOrder: string,
  selectedTag: string
) => {
  return useQuery({
    queryKey: ["posts", skip, limit, searchQuery, sortBy, sortOrder, selectedTag],
    queryFn: async () => {
      const [postsResponse, usersResponse] = await Promise.all([
        fetchPostsData(limit, skip),
        fetchUsersData()
      ]);
      return { postsData: postsResponse, usersData: usersResponse };
  },
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
    retry: RETRY_COUNT,
    refetchOnWindowFocus: false,
  });
}