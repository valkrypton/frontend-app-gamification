import { Alert, Card, Spinner } from '@openedx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import { useStreak } from '../hooks';
import ActivityStrip from './ActivityStrip';
import messages from './messages';

interface Props {
  courseId: string;
}

const StreakCard = ({ courseId }: Props) => {
  const intl = useIntl();
  const { data, isPending, isError } = useStreak(courseId);

  return (
    <Card>
      <Card.Header title={intl.formatMessage(messages.title)} />
      <Card.Section>
        {isPending && <Spinner animation="border" size="sm" screenReaderText="loading" />}
        {isError && <Alert variant="danger">{intl.formatMessage(messages.error)}</Alert>}
        {data && (
          <>
            <div className="d-flex mb-3">
              <div className="mr-5">
                <div className="h2 mb-0">{data.current_streak}</div>
                <div className="text-muted">{intl.formatMessage(messages.current)}</div>
              </div>
              <div>
                <div className="h2 mb-0">{data.longest_streak}</div>
                <div className="text-muted">{intl.formatMessage(messages.longest)}</div>
              </div>
            </div>
            <ActivityStrip currentStreak={data.current_streak} lastActiveDate={data.last_active_date} />
          </>
        )}
      </Card.Section>
    </Card>
  );
};

export default StreakCard;
