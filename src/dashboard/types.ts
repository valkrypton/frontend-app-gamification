export interface PointsSummary {
  total_points: number;
  week_points: number;
}

export interface Streak {
  current_streak: number;
  longest_streak: number;
  last_active_date: string | null;
}

export interface Badge {
  slug: string;
  name: string;
  description: string;
  points_bonus: number;
  earned: boolean;
  awarded_at: string | null;
}

export interface RankingStatus {
  course_id: string;
  handle: string | null;
  opted_in: boolean;
  opted_in_at: string | null;
  handle_generated_at: string | null;
  handle_regenerated: boolean;
}

export interface LeaderboardEntry {
  handle: string;
  points_band: string;
}

export interface Leaderboard {
  entries: LeaderboardEntry[];
  viewer_band: string | null;
}

export interface OptInRequest {
  opted_in: boolean;
  regenerate_handle?: boolean;
}
