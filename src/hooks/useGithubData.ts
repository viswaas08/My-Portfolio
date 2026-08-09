import { useQuery } from '@tanstack/react-query';
import { GithubService, CachedGithubData } from '../services/githubService';

export function useGithubData() {
  const query = useQuery<CachedGithubData>({
    queryKey: ['githubData', 'viswaas08'],
    queryFn: () => GithubService.fetchGithubData(),
    staleTime: 1000 * 60 * 60, // 1 hour stale time
    gcTime: 1000 * 60 * 60 * 6, // 6 hours garbage collection time
    refetchOnWindowFocus: false,
    retry: 1
  });

  return {
    data: query.data,
    profile: query.data?.profile,
    repos: query.data?.repos || [],
    events: query.data?.events || [],
    totalStars: query.data?.totalStars || 0,
    totalForks: query.data?.totalForks || 0,
    topLanguages: query.data?.topLanguages || [],
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch
  };
}
