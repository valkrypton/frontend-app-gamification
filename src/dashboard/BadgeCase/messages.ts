import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  title: {
    id: 'gamification.badgeCase.title',
    defaultMessage: 'Badges',
    description: 'Heading for the badge case card',
  },
  error: {
    id: 'gamification.badgeCase.error',
    defaultMessage: "Badges couldn't be loaded right now.",
    description: 'Error shown when the badge catalog fails to load',
  },
  earnedOn: {
    id: 'gamification.badgeCase.earnedOn',
    defaultMessage: 'Earned {date}',
    description: 'Shown under an earned badge with the date it was awarded',
  },
});

export default messages;
