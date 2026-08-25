import { useState } from 'react';
import {
  Alert, Button, Card, Form, Spinner,
} from '@openedx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import { useLeaderboard, useOptIn, useRankingStatus } from '../hooks';
import LeaderboardList from './LeaderboardList';
import messages from './messages';

interface Props {
  courseId: string;
}

const RankingCard = ({ courseId }: Props) => {
  const intl = useIntl();
  const status = useRankingStatus(courseId);
  const optIn = useOptIn(courseId);
  const leaderboard = useLeaderboard(courseId, { enabled: !!status.data?.opted_in });
  const [actionError, setActionError] = useState<string | null>(null);

  const handleToggle = (optedIn: boolean) => {
    setActionError(null);
    optIn.mutate({ opted_in: optedIn }, {
      onError: () => setActionError(intl.formatMessage(messages.toggleError)),
    });
  };

  const handleRegenerate = () => {
    setActionError(null);
    optIn.mutate({ opted_in: true, regenerate_handle: true }, {
      onError: () => setActionError(intl.formatMessage(messages.regenerateError)),
    });
  };

  return (
    <Card>
      <Card.Header title={intl.formatMessage(messages.title)} />
      <Card.Section>
        {status.isPending && <Spinner animation="border" size="sm" screenReaderText="loading" />}
        {status.isError && <Alert variant="danger">{intl.formatMessage(messages.loadError)}</Alert>}
        {actionError && <Alert variant="danger">{actionError}</Alert>}
        {status.data && (
          <>
            <Form.Switch
              checked={status.data.opted_in}
              onChange={(e) => handleToggle(e.target.checked)}
            >
              {intl.formatMessage(messages.optInLabel)}
            </Form.Switch>
            {status.data.opted_in && (
              <div className="mt-3">
                <div>{status.data.handle}</div>
                <Button
                  variant="tertiary"
                  size="sm"
                  disabled={optIn.isPending || status.data.handle_regenerated}
                  onClick={handleRegenerate}
                >
                  {intl.formatMessage(messages.regenerate)}
                </Button>
                {leaderboard.isPending && (
                  <Spinner animation="border" size="sm" screenReaderText="loading leaderboard" />
                )}
                {leaderboard.isError && (
                  <Alert variant="danger">{intl.formatMessage(messages.leaderboardError)}</Alert>
                )}
                {leaderboard.data && <LeaderboardList leaderboard={leaderboard.data} />}
              </div>
            )}
          </>
        )}
      </Card.Section>
    </Card>
  );
};

export default RankingCard;
