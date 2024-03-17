import { Status } from '@/components/UpdateFeedback/UpdateFeedback';

export const formatStatusName = (status: Status) => {
  switch (status) {
    case 'IN_PROGRESS':
      return 'In-Progress';
    case 'LIVE':
      return 'Live';
    case 'PLANNED':
      return 'Planned';
    case 'SUGGESTION':
      return 'Suggestion';
  }
};
