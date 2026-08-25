import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import type {
  Badge, Leaderboard, OptInRequest, PointsSummary, RankingStatus, Streak,
} from './types';

const baseUrl = () => `${getConfig().LMS_BASE_URL}/api/gamification/v1`;

export async function getPointsSummary(courseId: string): Promise<PointsSummary> {
  const { data } = await getAuthenticatedHttpClient()
    .get(`${baseUrl()}/points/summary`, { params: { course_id: courseId } });
  return data;
}

export async function getStreak(courseId: string): Promise<Streak> {
  const { data } = await getAuthenticatedHttpClient()
    .get(`${baseUrl()}/streak`, { params: { course_id: courseId } });
  return data;
}

export async function getBadges(courseId: string): Promise<Badge[]> {
  const { data } = await getAuthenticatedHttpClient()
    .get(`${baseUrl()}/badges`, { params: { course_id: courseId } });
  return data;
}

export async function getRankingStatus(courseId: string): Promise<RankingStatus> {
  const { data } = await getAuthenticatedHttpClient()
    .get(`${baseUrl()}/ranking/status`, { params: { course_id: courseId } });
  return data;
}

export async function getLeaderboard(courseId: string): Promise<Leaderboard> {
  const { data } = await getAuthenticatedHttpClient().get(`${baseUrl()}/leaderboard/${courseId}`);
  return data;
}

export async function postRankingOptIn(courseId: string, request: OptInRequest): Promise<RankingStatus> {
  const { data } = await getAuthenticatedHttpClient()
    .post(`${baseUrl()}/ranking/opt-in`, { course_id: courseId, ...request });
  return data;
}
