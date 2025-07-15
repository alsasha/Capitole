export const formatDate = (dateString: string | null | undefined): string => {
  try {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Unknown';
    return date.toLocaleDateString();
  } catch {
    return 'Unknown';
  }
};

export const formatRating = (rating: number | null | undefined): string => {
  try {
    if (typeof rating !== 'number' || isNaN(rating)) return 'N/A';
    return rating.toFixed(1);
  } catch {
    return 'N/A';
  }
};
