import moment from "moment";

export const getDigitsNums = (val: string): string => {
  if (!val) return "";

  return val.replace(/[^\d]/g, "");
};

export const formatNumber = (value: string | number): string => {
  return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
};

export const formatDate = (date: string, format?) => {
  if (!date) {
    return "-";
  }

  return moment(date).format(format ? format : "DD-MM-YYYY");
};