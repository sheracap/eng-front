import { getDigitsNums } from "#utils/formatters";

export const isValidPassword = (pass: string) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,16}$/.test(pass);
};

export const isValidTin = (pass: string) => {
  return /^(?=.*[0-9]).{9}$/.test(pass);
};

export const validateTin = (value, maxNumber, message = "Заполните все поле") => {
  if (value === null || value === undefined) {
    value = "";
    if (getDigitsNums(value) === "" || getDigitsNums(value).length === maxNumber) {
      return Promise.resolve();
    } else {
      return Promise.reject(new Error(message));
    }
  } else if (getDigitsNums(value) === "" || getDigitsNums(value).length === maxNumber) {
    return Promise.resolve();
  } else {
    return Promise.reject(new Error(message));
  }
};
