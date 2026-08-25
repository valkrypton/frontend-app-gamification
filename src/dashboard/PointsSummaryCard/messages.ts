import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  title: {
    id: 'gamification.pointsSummaryCard.title',
    defaultMessage: 'Points',
    description: 'Heading for the points summary card',
  },
  weekDelta: {
    id: 'gamification.pointsSummaryCard.weekDelta',
    defaultMessage: '+{weekPoints} this week',
    description: "This week's point delta, shown under the total",
  },
  error: {
    id: 'gamification.pointsSummaryCard.error',
    defaultMessage: "Points couldn't be loaded right now.",
    description: 'Error shown when the points summary fails to load',
  },
});

export default messages;
