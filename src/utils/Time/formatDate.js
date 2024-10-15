export const formatDate = (date) => {
  const currentDate = new Date();
  const postDate = new Date(date);

  if (
    currentDate.getFullYear() === postDate.getFullYear() &&
    currentDate.getMonth() === postDate.getMonth() &&
    currentDate.getDate() === postDate.getDate()
  ) {
    return postDate.toLocaleString([], {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } else {
    return postDate.toLocaleString([], {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }
};
