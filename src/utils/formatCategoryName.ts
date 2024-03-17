export const formatCategoryName = (category: string) => {
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
    default:
      return 'All';
  }
};
