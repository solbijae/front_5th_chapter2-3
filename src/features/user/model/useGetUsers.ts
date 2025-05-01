import { useQuery } from '@tanstack/react-query';
import { GC_TIME, RETRY_COUNT, STALE_TIME } from '@/app/config/cache';
import { fetchOpenUserModalData } from '@/entities/user/api/user';
import { UserDetail } from '@/entities/user/config/user';

export const useGetUsers = (selectedUser: UserDetail | null) => {
  return useQuery({
    queryKey: ['user', selectedUser?.id],
    queryFn: () => fetchOpenUserModalData(selectedUser),
    enabled: !!selectedUser?.id,
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
    retry: RETRY_COUNT,
    refetchOnWindowFocus: false,
  });
}