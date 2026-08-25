import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  title: {
    id: 'gamification.streakCard.title',
    defaultMessage: 'Streak',
    description: 'Heading for the streak card',
  },
  current: {
    id: 'gamification.streakCard.current',
    defaultMessage: 'Current streak',
    description: 'Label under the current streak number',
  },
  longest: {
    id: 'gamification.streakCard.longest',
    defaultMessage: 'Longest streak',
    description: 'Label under the longest streak number',
  },
  error: {
    id: 'gamification.streakCard.error',
    defaultMessage: "Streak couldn't be loaded right now.",
    description: 'Error shown when the streak fails to load',
  },
});

export default messages;
