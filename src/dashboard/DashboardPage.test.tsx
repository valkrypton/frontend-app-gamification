import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import * as api from './api';
import DashboardPage from './DashboardPage';

jest.mock('./api');

describe('DashboardPage', () => {
  it('mounts all four cards for the course in the route', async () => {
    (api.getPointsSummary as jest.Mock).mockResolvedValue({ total_points: 0, week_points: 0 });
    (api.getStreak as jest.Mock).mockResolvedValue({ current_streak: 0, longest_streak: 0, last_active_date: null });
    (api.getBadges as jest.Mock).mockResolvedValue([]);
    (api.getRankingStatus as jest.Mock).mockResolvedValue({
      course_id: 'course-v1:Org+Course+Run',
      handle: null,
      opted_in: false,
      opted_in_at: null,
      handle_generated_at: null,
      handle_regenerated: false,
    });

    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    render(
      <IntlProvider locale="en">
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={['/course/course-v1:Org+Course+Run']}>
            <Routes>
              <Route path="/course/:courseId" element={<DashboardPage />} />
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>
      </IntlProvider>,
    );

    expect(await screen.findByText('Points')).toBeInTheDocument();
    expect(screen.getByText('Streak')).toBeInTheDocument();
    expect(screen.getByText('Badges')).toBeInTheDocument();
    expect(screen.getByText('Ranking')).toBeInTheDocument();
  });
});
