export const timestamp2string = (timestamp: number): string => {
  if (!timestamp) throw Error("timestamp Invalid");

  const dateObj = new Date(timestamp);
  return `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${dateObj.getDate().toString().padStart(2, "0")}`;
};
