export const getDigitsNums = (val: string): string => {
  if (!val) return "";

  return val.replace(/[^\d]/g, "");
};

export const formatNumber = (value: string | number): string => {
  return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
};