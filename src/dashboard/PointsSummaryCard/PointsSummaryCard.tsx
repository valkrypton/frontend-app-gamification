import { Alert, Card, Spinner } from '@openedx/paragon';
import { FormattedMessage, useIntl } from '@edx/frontend-platform/i18n';
import { usePointsSummary } from '../hooks';
import messages from './messages';

interface Props {
  courseId: string;
}

const PointsSummaryCard = ({ courseId }: Props) => {
  const intl = useIntl();
  const { data, isPending, isError } = usePointsSummary(courseId);

  return (
    <Card>
      <Card.Header title={intl.formatMessage(messages.title)} />
      <Card.Section>
        {isPending && <Spinner animation="border" size="sm" screenReaderText="loading" />}
        {isError && <Alert variant="danger">{intl.formatMessage(messages.error)}</Alert>}
        {data && (
          <>
            <div className="h2 mb-0">{data.total_points}</div>
            <div className="text-muted">
              <FormattedMessage {...messages.weekDelta} values={{ weekPoints: data.week_points }} />
            </div>
          </>
        )}
      </Card.Section>
    </Card>
  );
};

export default PointsSummaryCard;
