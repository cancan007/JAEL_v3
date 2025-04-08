export const putUnitToBigNum = (num?: number) => {
  if (num == undefined || num == null) return;
  if (num == 0) return 0;
  if (num >= 10 ** 9) {
    return `${(num / 10 ** 9).toFixed(3)}B`;
  } else if (num >= 10 ** 6) {
    return `${(num / 10 ** 6).toFixed(3)}M`;
  } else if (num >= 10 ** 3) {
    return `${(num / 10 ** 3).toFixed(3)}K`;
  } else {
    return num.toFixed(2);
  }
};
