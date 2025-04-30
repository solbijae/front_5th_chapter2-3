import { useQuery } from '@tanstack/react-query';
import { fetchCommentsData } from '../api/comment';
import { STALE_TIME, GC_TIME, RETRY_COUNT, Post } from '../../../config';



export const useGetComments = (selectedPost: Post | null) => {
  return useQuery({
    queryKey: ['comments', selectedPost?.id],
    queryFn: () => fetchCommentsData(selectedPost?.id || 0),
    enabled: !!selectedPost?.id,
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
    retry: RETRY_COUNT,
    refetchOnWindowFocus: false,
  });
}
