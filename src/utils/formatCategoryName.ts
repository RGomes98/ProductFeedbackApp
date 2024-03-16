import { Category } from '@/components/UpdateFeedback/UpdateFeedback';

export const formatCategoryName = (category: Category) => {
  switch (category) {
    case 'BUG':
      return 'Bug';
    case 'ENHANCEMENT':
      return 'Enhancement';
    case 'FEATURE':
      return 'Feature';
    case 'UI':
      return 'UI';
    case 'UX':
      return 'UX';
  }
};
