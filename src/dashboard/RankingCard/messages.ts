import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  title: {
    id: 'gamification.rankingCard.title',
    defaultMessage: 'Ranking',
    description: 'Heading for the ranking card',
  },
  loadError: {
    id: 'gamification.rankingCard.loadError',
    defaultMessage: "Ranking status couldn't be loaded right now.",
    description: 'Error shown when the ranking status fails to load',
  },
  leaderboardError: {
    id: 'gamification.rankingCard.leaderboardError',
    defaultMessage: "Leaderboard couldn't be loaded right now.",
    description: 'Error shown when the leaderboard fails to load',
  },
  optInLabel: {
    id: 'gamification.rankingCard.optInLabel',
    defaultMessage: 'Show me on the leaderboard',
    description: 'Label for the ranking opt-in toggle',
  },
  regenerate: {
    id: 'gamification.rankingCard.regenerate',
    defaultMessage: 'Get a new handle',
    description: 'Button to regenerate the anonymized ranking handle',
  },
  toggleError: {
    id: 'gamification.rankingCard.toggleError',
    defaultMessage: "Couldn't update your ranking preference. Try again.",
    description: 'Error shown when the opt-in toggle fails to save',
  },
  regenerateError: {
    id: 'gamification.rankingCard.regenerateError',
    defaultMessage: "Couldn't generate a new handle. Try again.",
    description: 'Error shown when regenerating the handle fails',
  },
  viewerBand: {
    id: 'gamification.rankingCard.viewerBand',
    defaultMessage: 'Your position: {band}',
    description: "The viewer's own leaderboard band",
  },
});

export default messages;
