import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import {
  getBadges, getLeaderboard, getPointsSummary, getRankingStatus, getStreak, postRankingOptIn,
} from './api';

jest.mock('@edx/frontend-platform/auth');
jest.mock('@edx/frontend-platform', () => ({
  getConfig: () => ({ LMS_BASE_URL: 'http://localhost:18000' }),
}));

const mockGet = jest.fn();
const mockPost = jest.fn();
(getAuthenticatedHttpClient as jest.Mock).mockReturnValue({ get: mockGet, post: mockPost });

const BASE = 'http://localhost:18000/api/gamification/v1';

describe('api', () => {
  beforeEach(() => {
    mockGet.mockReset();
    mockPost.mockReset();
  });

  it('getPointsSummary requests the points summary endpoint with course_id', async () => {
    mockGet.mockResolvedValue({ data: { total_points: 10, week_points: 5 } });
    const result = await getPointsSummary('course-v1:x');
    expect(mockGet).toHaveBeenCalledWith(`${BASE}/points/summary`, { params: { course_id: 'course-v1:x' } });
    expect(result).toEqual({ total_points: 10, week_points: 5 });
  });

  it('getStreak requests the streak endpoint with course_id', async () => {
    mockGet.mockResolvedValue({ data: { current_streak: 1, longest_streak: 2, last_active_date: '2026-08-20' } });
    await getStreak('course-v1:x');
    expect(mockGet).toHaveBeenCalledWith(`${BASE}/streak`, { params: { course_id: 'course-v1:x' } });
  });

  it('getBadges requests the badges endpoint with course_id', async () => {
    mockGet.mockResolvedValue({ data: [] });
    await getBadges('course-v1:x');
    expect(mockGet).toHaveBeenCalledWith(`${BASE}/badges`, { params: { course_id: 'course-v1:x' } });
  });

  it('getRankingStatus requests the ranking status endpoint with course_id', async () => {
    mockGet.mockResolvedValue({
      data: {
        course_id: 'course-v1:x',
        handle: null,
        opted_in: false,
        opted_in_at: null,
        handle_generated_at: null,
        handle_regenerated: false,
      },
    });
    await getRankingStatus('course-v1:x');
    expect(mockGet).toHaveBeenCalledWith(`${BASE}/ranking/status`, { params: { course_id: 'course-v1:x' } });
  });

  it('getLeaderboard requests the leaderboard endpoint for the course', async () => {
    mockGet.mockResolvedValue({ data: { entries: [], viewer_band: null } });
    await getLeaderboard('course-v1:x');
    expect(mockGet).toHaveBeenCalledWith(`${BASE}/leaderboard/course-v1:x`);
  });

  it('postRankingOptIn posts course_id plus the request body', async () => {
    mockPost.mockResolvedValue({
      data: {
        course_id: 'course-v1:x',
        handle: 'Quiet Falcon 01',
        opted_in: true,
        opted_in_at: '2026-08-25T00:00:00Z',
        handle_generated_at: '2026-08-25T00:00:00Z',
        handle_regenerated: false,
      },
    });
    await postRankingOptIn('course-v1:x', { opted_in: true });
    expect(mockPost).toHaveBeenCalledWith(`${BASE}/ranking/opt-in`, { course_id: 'course-v1:x', opted_in: true });
  });
});
