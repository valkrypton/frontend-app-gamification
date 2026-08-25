import { Col, Container, Row } from '@openedx/paragon';
import { useParams } from 'react-router-dom';
import { useIntl } from '@edx/frontend-platform/i18n';
import PointsSummaryCard from './PointsSummaryCard/PointsSummaryCard';
import StreakCard from './StreakCard/StreakCard';
import BadgeCase from './BadgeCase/BadgeCase';
import RankingCard from './RankingCard/RankingCard';
import messages from './messages';

const DashboardPage = () => {
  const intl = useIntl();
  const { courseId } = useParams<{ courseId: string }>();

  if (!courseId) {
    return null;
  }

  return (
    <main>
      <Container className="py-5">
        <h1>{intl.formatMessage(messages.title)}</h1>
        <Row className="mt-4">
          <Col xs={12} md={6}><PointsSummaryCard courseId={courseId} /></Col>
          <Col xs={12} md={6}><StreakCard courseId={courseId} /></Col>
          <Col xs={12} md={6} className="mt-4"><BadgeCase courseId={courseId} /></Col>
          <Col xs={12} md={6} className="mt-4"><RankingCard courseId={courseId} /></Col>
        </Row>
      </Container>
    </main>
  );
};

export default DashboardPage;
