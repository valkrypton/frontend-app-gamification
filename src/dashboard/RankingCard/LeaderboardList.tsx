import { useIntl } from '@edx/frontend-platform/i18n';
import type { Leaderboard } from '../types';
import messages from './messages';

interface Props {
  leaderboard: Leaderboard;
}

const LeaderboardList = ({ leaderboard }: Props) => {
  const intl = useIntl();
  return (
    <div>
      <ol data-testid="leaderboard-entries">
        {leaderboard.entries.map((entry) => (
          <li key={entry.handle}>
            {entry.handle}
            {' · '}
            {entry.points_band}
          </li>
        ))}
      </ol>
      {leaderboard.viewer_band && (
        <div className="text-muted" data-testid="viewer-band">
          {intl.formatMessage(messages.viewerBand, { band: leaderboard.viewer_band })}
        </div>
      )}
    </div>
  );
};

export default LeaderboardList;
