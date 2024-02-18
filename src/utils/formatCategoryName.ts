export const formatCategoryName = (category: string) => {
  return category !== 'UX' && category !== 'UI' ? category.toLowerCase() : category;
};
