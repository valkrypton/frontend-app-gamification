import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getBadges, getLeaderboard, getPointsSummary, getRankingStatus, getStreak, postRankingOptIn,
} from './api';
import type { OptInRequest } from './types';

export const usePointsSummary = (courseId: string) => useQuery({
  queryKey: ['gamification', 'points-summary', courseId],
  queryFn: () => getPointsSummary(courseId),
});

export const useStreak = (courseId: string) => useQuery({
  queryKey: ['gamification', 'streak', courseId],
  queryFn: () => getStreak(courseId),
});

export const useBadges = (courseId: string) => useQuery({
  queryKey: ['gamification', 'badges', courseId],
  queryFn: () => getBadges(courseId),
});

export const useRankingStatus = (courseId: string) => useQuery({
  queryKey: ['gamification', 'ranking-status', courseId],
  queryFn: () => getRankingStatus(courseId),
});

export const useLeaderboard = (courseId: string, { enabled }: { enabled: boolean }) => useQuery({
  queryKey: ['gamification', 'leaderboard', courseId],
  queryFn: () => getLeaderboard(courseId),
  enabled,
});

export const useOptIn = (courseId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: OptInRequest) => postRankingOptIn(courseId, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gamification', 'ranking-status', courseId] });
      queryClient.invalidateQueries({ queryKey: ['gamification', 'leaderboard', courseId] });
    },
  });
};
