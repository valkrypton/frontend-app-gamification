import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as api from '../api';
import PointsSummaryCard from './PointsSummaryCard';

jest.mock('../api');

function renderCard() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <IntlProvider locale="en">
      <QueryClientProvider client={queryClient}>
        <PointsSummaryCard courseId="course-v1:x" />
      </QueryClientProvider>
    </IntlProvider>,
  );
}

describe('PointsSummaryCard', () => {
  it('renders the total and this week\'s delta once loaded', async () => {
    (api.getPointsSummary as jest.Mock).mockResolvedValue({ total_points: 42, week_points: 5 });
    renderCard();
    expect(await screen.findByText('42')).toBeInTheDocument();
    expect(screen.getByText('+5 this week')).toBeInTheDocument();
  });

  it('shows an error alert when the request fails', async () => {
    (api.getPointsSummary as jest.Mock).mockRejectedValue(new Error('network error'));
    renderCard();
    expect(await screen.findByText(/couldn't be loaded/i)).toBeInTheDocument();
  });
});
