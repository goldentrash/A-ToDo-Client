export const formatTimestamp = (timestamp: number): string => {
  if (!timestamp) throw Error("timestamp Invalid");

  const dateObj = new Date(timestamp);
  return `${dateObj.getFullYear()}-${
    dateObj.getMonth() + 1
  }-${dateObj.getDate()}`;
};
