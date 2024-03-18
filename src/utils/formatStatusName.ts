export const formatStatusName = (status: string) => {
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
