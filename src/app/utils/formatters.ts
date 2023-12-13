import { PACKAGE, STANDART, TIER } from "#utils/constants";
import moment from "moment";
import numeral from "numeral";

export const formatPrice = (incomeNumber: number, withFloat = false, hard = true): string => {
  const number = incomeNumber || 0;
  if (withFloat) {
    const calc = number.toString();

    if (hard) {
      return numeral(calc).format("0,0.00").replace(/,/g, " ");
    }

    return numeral(calc)
      .format(calc.includes(".") ? "0,0.00" : "0,0")
      .replace(/,/g, " ");
  } else {
    return numeral(number).format("0,0").replace(/,/g, " ");
  }
};

export const roundPrice = (number = 0): number => {
  return Number(number.toFixed(2));
};

export const formatNumber = (number = 0, withFloat = false): string => {
  if (withFloat) {
    return numeral(number).format("0,0.00").replace(/,/g, " ");
  } else {
    return numeral(number).format("0,0").replace(/,/g, " ");
  }
};

export const formatDate = (date: string) => moment(date).format("DD.MM.YYYY/HH:mm");

export const formatFullName = (person): string => {
  if (!person || (!person.firstName && !person.lastName && !person.patronymic)) {
    return "-";
  }

  return `${person.lastName ? `${person.lastName} ` : ""}${person.firstName ? `${person.firstName} ` : ""}${
    person.patronymic ? person.patronymic : ""
  }`;
};

export const formatFullAddress = ({ region, district, street }): string => {
  return `${region?.name}, ${district?.name}, ${street}`;
};

export const formatPhoneNumber = (str) => {
  const cleaned = ("" + str).replace(/\D/g, "");

  const match = cleaned.match(/^(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})$/);

  if (match) {
    return `+${match[1]} ${match[2]} ${match[3]} ${match[4]} ${match[5]}`;
  }

  return null;
};

export const getDigitsNums = (val: string): string => {
  if (!val) return "";

  return val.replace(/[^\d]/g, "");
};

export const replaceSpaces = (str, newChar = ""): string => {
  return str.replace(/\s/g, newChar);
};

const parseRightSide = (str) => {
  let result = "";

  for (let i = 0; i < str.length; i++) {
    // @ts-ignore
    if (!isNaN(str[i])) {
      result = result + str[i];
    } else {
      break;
    }
  }

  return result;
};

export const formatStringNumber = (str = "") => {
  let newStr = "";

  str = str.replace(/,/g, ".");

  if (str.length) {
    const strWithoutSpaces = replaceSpaces(str);
    const sides = strWithoutSpaces.split(".");

    const leftSide = sides[0];
    const rightSide = sides[1];

    newStr = formatNumber(Number(leftSide) || 0);

    if (str.includes(".")) {
      newStr = newStr + ".";
    }

    if (rightSide) {
      const rightSideFormatted = parseRightSide(rightSide);

      if (rightSideFormatted) {
        newStr = newStr + rightSideFormatted;
      }
    }
  }

  return newStr;
};

export const formatPriceProduct = (price) => {
  const n = String(price),
    p = n.indexOf(".");

  return n.replace(/\d(?=(?:\d{3})+(?:\.|$))/g, (m, i) => (p < 0 || i < p ? `${m} ` : m));
};

export const uniqArray = (array) => {
  const hash = {};
  return array.filter((item) => {
    return hash[item] ? false : (hash[item] = true);
  });
};

export const getTariffRecurring = (xizmat) => {
  return xizmat.recurring ? "Повторяющийся" : "Разовый";
};

export const getAgreementRecurring = (agreement) => {
  if (agreement.xizmat) {
    return getTariffRecurring(agreement.xizmat);
  } else if (agreement.agreements) {
    return uniqArray(agreement.agreements.map((item) => getAgreementRecurring(item))).join(", ");
  } else {
    return "-";
  }
};

export const getTariffRecurringModel = (xizmat) => {
  if (xizmat && xizmat.recurring) {
    if (xizmat.recurringModel) {
      return ` на ${xizmat.recurringModel.intervalCount} ${xizmat.recurringModel.interval.nameRu}`;
    }
  }

  return "";
};

export const getTariffPrice = (xizmat) => {
  const pricingModel = xizmat.pricingModel && xizmat.pricingModel.code;
  if (pricingModel === STANDART || pricingModel === TIER) {
    return xizmat.fee;
  } else if (pricingModel === PACKAGE || pricingModel === TIER) {
    if (xizmat.tiers.length) {
      return xizmat.tiers[0].flatFee;
    }
  }

  return 0;
};

export const getAgreementPrice = (agreement) => {
  const xizmat = agreement.xizmat;

  if (xizmat) {
    const price = getTariffPrice(xizmat);
    const instances = agreement.instances || 1;

    return price * instances;
  } else if (agreement.agreements) {
    return agreement.agreements.reduce((acc, item) => acc + getAgreementPrice(item), 0);
  } else {
    return 0;
  }
};

export const getAgreementTariff = (agreement) => {
  if (agreement.xizmat) {
    return agreement.xizmat.title;
  } else if (agreement.agreements) {
    return uniqArray(agreement.agreements.map((item) => getAgreementTariff(item))).join(", ");
  } else {
    return "-";
  }
};
