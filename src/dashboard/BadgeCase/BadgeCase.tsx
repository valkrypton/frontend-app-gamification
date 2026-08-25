import { Alert, Card, Spinner } from '@openedx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import { useBadges } from '../hooks';
import BadgeTile from './BadgeTile';
import messages from './messages';

interface Props {
  courseId: string;
}

const BadgeCase = ({ courseId }: Props) => {
  const intl = useIntl();
  const { data, isPending, isError } = useBadges(courseId);

  return (
    <Card>
      <Card.Header title={intl.formatMessage(messages.title)} />
      <Card.Section>
        {isPending && <Spinner animation="border" size="sm" screenReaderText="loading" />}
        {isError && <Alert variant="danger">{intl.formatMessage(messages.error)}</Alert>}
        {data && (
          <div className="d-flex flex-wrap">
            {data.map((badge) => <BadgeTile key={badge.slug} badge={badge} />)}
          </div>
        )}
      </Card.Section>
    </Card>
  );
};

export default BadgeCase;
