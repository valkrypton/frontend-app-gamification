import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as api from '../api';
import StreakCard from './StreakCard';

jest.mock('../api');

function renderCard() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <IntlProvider locale="en">
      <QueryClientProvider client={queryClient}>
        <StreakCard courseId="course-v1:x" />
      </QueryClientProvider>
    </IntlProvider>,
  );
}

describe('StreakCard', () => {
  it('renders current and longest streak, and the activity strip, once loaded', async () => {
    (api.getStreak as jest.Mock).mockResolvedValue({
      current_streak: 3, longest_streak: 5, last_active_date: '2026-08-20',
    });
    renderCard();
    expect(await screen.findByText('3')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByTestId('activity-strip')).toBeInTheDocument();
  });

  it('shows an error alert when the request fails', async () => {
    (api.getStreak as jest.Mock).mockRejectedValue(new Error('network error'));
    renderCard();
    expect(await screen.findByText(/couldn't be loaded/i)).toBeInTheDocument();
  });
});
