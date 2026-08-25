import '@testing-library/jest-dom';
import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as api from '../api';
import RankingCard from './RankingCard';

jest.mock('../api');

function renderCard() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <IntlProvider locale="en">
      <QueryClientProvider client={queryClient}>
        <RankingCard courseId="course-v1:x" />
      </QueryClientProvider>
    </IntlProvider>,
  );
}

describe('RankingCard', () => {
  it('shows only the toggle, with no leaderboard fetch, when not opted in', async () => {
    (api.getRankingStatus as jest.Mock).mockResolvedValue({
      course_id: 'course-v1:x',
      handle: null,
      opted_in: false,
      opted_in_at: null,
      handle_generated_at: null,
      handle_regenerated: false,
    });
    renderCard();
    expect(await screen.findByRole('switch')).not.toBeChecked();
    expect(api.getLeaderboard).not.toHaveBeenCalled();
  });

  it('shows the handle and leaderboard, with regenerate disabled once used, when opted in', async () => {
    (api.getRankingStatus as jest.Mock).mockResolvedValue({
      course_id: 'course-v1:x',
      handle: 'Quiet Falcon 01',
      opted_in: true,
      opted_in_at: '2026-08-20T00:00:00Z',
      handle_generated_at: '2026-08-20T00:00:00Z',
      handle_regenerated: true,
    });
    (api.getLeaderboard as jest.Mock).mockResolvedValue({
      entries: [{ handle: 'Quiet Falcon 01', points_band: '0-49' }], viewer_band: 'top 25%',
    });
    renderCard();
    expect(await screen.findByText('Quiet Falcon 01')).toBeInTheDocument();
    expect(await screen.findByTestId('leaderboard-entries')).toHaveTextContent('Quiet Falcon 01');
    expect(screen.getByRole('button', { name: /regenerate|new handle/i })).toBeDisabled();
  });

  it('toggles opt-in when the switch is changed', async () => {
    (api.getRankingStatus as jest.Mock).mockResolvedValue({
      course_id: 'course-v1:x',
      handle: null,
      opted_in: false,
      opted_in_at: null,
      handle_generated_at: null,
      handle_regenerated: false,
    });
    (api.postRankingOptIn as jest.Mock).mockResolvedValue({
      course_id: 'course-v1:x',
      handle: 'Quiet Falcon 01',
      opted_in: true,
      opted_in_at: '2026-08-25T00:00:00Z',
      handle_generated_at: '2026-08-25T00:00:00Z',
      handle_regenerated: false,
    });
    renderCard();
    const toggle = await screen.findByRole('switch');
    fireEvent.click(toggle);
    await waitFor(() => expect(api.postRankingOptIn).toHaveBeenCalledWith('course-v1:x', { opted_in: true }));
  });
});
