export const isLessThan7Days = (date1, date2) => {
  const MS_PER_DAY = 24 * 60 * 60 * 1000;
  return Math.abs(date2 - date1) / MS_PER_DAY < 7;
};

export const formatDate = (date, includeTime = false, removeDashes = false) => {
  const [year, month, day, hour, minute] = [
    date.getUTCFullYear(),
    String(date.getUTCMonth() + 1).padStart(2, "0"),
    String(date.getUTCDate()).padStart(2, "0"),
    String(date.getUTCHours()).padStart(2, "0"),
    String(date.getUTCMinutes()).padStart(2, "0"),
  ];

  const separator = removeDashes ? "" : "-";
  const datePart = `${year}${separator}${month}${separator}${day}`;

  return includeTime ? `${datePart}T${hour}:${minute}:00` : datePart;
};
