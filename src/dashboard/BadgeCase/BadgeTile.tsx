import { Icon } from '@openedx/paragon';
import { EmojiEvents, Lock } from '@openedx/paragon/icons';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import type { Badge } from '../types';
import messages from './messages';

interface Props {
  badge: Badge;
}

const BadgeTile = ({ badge }: Props) => (
  <div className={`text-center p-3 ${badge.earned ? '' : 'text-muted'}`} data-testid={`badge-tile-${badge.slug}`}>
    <Icon src={badge.earned ? EmojiEvents : Lock} className={badge.earned ? 'text-warning' : 'text-light-700'} />
    <div className="font-weight-bold">{badge.name}</div>
    {badge.earned ? (
      <div className="small text-muted">
        <FormattedMessage {...messages.earnedOn} values={{ date: badge.awarded_at }} />
      </div>
    ) : (
      <div className="small">{badge.description}</div>
    )}
  </div>
);

export default BadgeTile;
