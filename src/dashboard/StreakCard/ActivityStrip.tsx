interface Props {
  currentStreak: number;
  lastActiveDate: string | null;
  referenceDate?: Date;
}

const DAY_MS = 24 * 60 * 60 * 1000;

function activeDaySet(currentStreak: number, lastActiveDate: string | null): Set<string> {
  if (!lastActiveDate || currentStreak <= 0) {
    return new Set();
  }
  const last = new Date(`${lastActiveDate}T00:00:00Z`).getTime();
  const days = new Set<string>();
  for (let i = 0; i < currentStreak; i += 1) {
    days.add(new Date(last - i * DAY_MS).toISOString().slice(0, 10));
  }
  return days;
}

const ActivityStrip = ({ currentStreak, lastActiveDate, referenceDate = new Date() }: Props) => {
  const active = activeDaySet(currentStreak, lastActiveDate);
  const days = Array.from({ length: 7 }, (_unused, i) => {
    const d = new Date(Date.UTC(
      referenceDate.getUTCFullYear(), referenceDate.getUTCMonth(), referenceDate.getUTCDate(),
    ) - (6 - i) * DAY_MS);
    return d.toISOString().slice(0, 10);
  });

  return (
    <div className="d-flex" data-testid="activity-strip">
      {days.map((day) => (
        <span
          key={day}
          data-testid={active.has(day) ? 'activity-dot-active' : 'activity-dot-inactive'}
          className={active.has(day) ? 'bg-success' : 'bg-light'}
          style={{
            width: 12, height: 12, borderRadius: '50%', marginRight: 4, display: 'inline-block',
          }}
        />
      ))}
    </div>
  );
};

export default ActivityStrip;
