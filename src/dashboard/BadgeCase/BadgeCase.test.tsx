import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as api from '../api';
import BadgeCase from './BadgeCase';

jest.mock('../api');

function renderCase() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <IntlProvider locale="en">
      <QueryClientProvider client={queryClient}>
        <BadgeCase courseId="course-v1:x" />
      </QueryClientProvider>
    </IntlProvider>,
  );
}

describe('BadgeCase', () => {
  it('shows an earned badge lit and a locked badge with its trigger hint', async () => {
    (api.getBadges as jest.Mock).mockResolvedValue([
      {
        slug: 'first-step',
        name: 'First Step',
        description: 'Complete your first activity',
        points_bonus: 25,
        earned: true,
        awarded_at: '2026-08-20T00:00:00Z',
      },
      {
        slug: 'on-a-roll',
        name: 'On a Roll',
        description: 'Reach a 7-day streak',
        points_bonus: 100,
        earned: false,
        awarded_at: null,
      },
    ]);
    renderCase();

    const earned = await screen.findByTestId('badge-tile-first-step');
    expect(earned).toHaveTextContent('First Step');
    expect(earned).not.toHaveTextContent('Complete your first activity');

    const locked = screen.getByTestId('badge-tile-on-a-roll');
    expect(locked).toHaveTextContent('On a Roll');
    expect(locked).toHaveTextContent('Reach a 7-day streak');
  });

  it('shows an error alert when the request fails', async () => {
    (api.getBadges as jest.Mock).mockRejectedValue(new Error('network error'));
    renderCase();
    expect(await screen.findByText(/couldn't be loaded/i)).toBeInTheDocument();
  });
});
