import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import * as api from './api';
import {
  useBadges, useLeaderboard, useOptIn, usePointsSummary, useRankingStatus, useStreak,
} from './hooks';

jest.mock('./api');

function wrapper({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

describe.each([
  ['usePointsSummary', usePointsSummary, 'getPointsSummary', { total_points: 42, week_points: 5 }],
  ['useStreak', useStreak, 'getStreak', { current_streak: 3, longest_streak: 5, last_active_date: '2026-08-20' }],
  ['useBadges', useBadges, 'getBadges', [
    {
      slug: 'first-step',
      name: 'First Step',
      description: '',
      points_bonus: 25,
      earned: true,
      awarded_at: '2026-08-20T00:00:00Z',
    },
  ]],
  ['useRankingStatus', useRankingStatus, 'getRankingStatus', {
    course_id: 'course-v1:x',
    handle: 'Quiet Falcon 01',
    opted_in: true,
    opted_in_at: '2026-08-20T00:00:00Z',
    handle_generated_at: '2026-08-20T00:00:00Z',
    handle_regenerated: false,
  }],
])('%s', (_name, hook, apiFnName, fixture) => {
  it('fetches and returns data for the given course', async () => {
    (api[apiFnName as keyof typeof api] as jest.Mock).mockResolvedValue(fixture);
    const { result } = renderHook(
      () => (hook as (courseId: string) => ReturnType<typeof usePointsSummary>)('course-v1:x'),
      { wrapper },
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(fixture);
    expect(api[apiFnName as keyof typeof api]).toHaveBeenCalledWith('course-v1:x');
  });
});

describe('useLeaderboard', () => {
  it('does not fetch when disabled', () => {
    const { result } = renderHook(() => useLeaderboard('course-v1:x', { enabled: false }), { wrapper });
    expect(result.current.fetchStatus).toBe('idle');
    expect(api.getLeaderboard).not.toHaveBeenCalled();
  });

  it('fetches when enabled', async () => {
    (api.getLeaderboard as jest.Mock).mockResolvedValue({ entries: [], viewer_band: null });
    const { result } = renderHook(() => useLeaderboard('course-v1:x', { enabled: true }), { wrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(api.getLeaderboard).toHaveBeenCalledWith('course-v1:x');
  });
});

describe('useOptIn', () => {
  it('invalidates ranking-status and leaderboard queries for the course on success', async () => {
    (api.postRankingOptIn as jest.Mock).mockResolvedValue({
      course_id: 'course-v1:x',
      handle: 'Quiet Falcon 01',
      opted_in: true,
      opted_in_at: '2026-08-25T00:00:00Z',
      handle_generated_at: '2026-08-25T00:00:00Z',
      handle_regenerated: false,
    });
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries');
    const localWrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useOptIn('course-v1:x'), { wrapper: localWrapper });
    result.current.mutate({ opted_in: true });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['gamification', 'ranking-status', 'course-v1:x'] });
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['gamification', 'leaderboard', 'course-v1:x'] });
  });
});
