import { QueryClient } from "@tanstack/react-query";

// queryKeys 캐시 무효화
export const invalidateQueries = (queryClient: QueryClient, queryKeys: string[]) => {
  queryKeys.forEach(key => {
    queryClient.invalidateQueries({ queryKey: [key] });
  });
};