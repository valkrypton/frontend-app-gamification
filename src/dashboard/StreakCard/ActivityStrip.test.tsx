import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ActivityStrip from './ActivityStrip';

describe('ActivityStrip', () => {
  it('lights up exactly the last N days of a streak, ending on the reference date', () => {
    render(
      <ActivityStrip
        currentStreak={3}
        lastActiveDate="2026-08-20"
        referenceDate={new Date('2026-08-20T12:00:00Z')}
      />,
    );
    const dots = screen.getAllByTestId(/activity-dot/);
    expect(dots).toHaveLength(7);
    expect(screen.getAllByTestId('activity-dot-active')).toHaveLength(3);
    expect(dots.slice(-3).every((dot) => dot.dataset.testid === 'activity-dot-active')).toBe(true);
    expect(dots.slice(0, 4).every((dot) => dot.dataset.testid === 'activity-dot-inactive')).toBe(true);
  });

  it('lights up nothing when there is no streak yet', () => {
    render(<ActivityStrip currentStreak={0} lastActiveDate={null} />);
    expect(screen.queryAllByTestId('activity-dot-active')).toHaveLength(0);
  });
});
