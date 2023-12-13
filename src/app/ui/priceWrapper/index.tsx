import React from "react";

import { UZS_CURRENCY } from "#constants/index";
import { formatPrice } from "#utils/formatters";

import { useStyles } from "./styles";

export const PriceWrapper = ({ price }: { price: number }) => {
  const classes = useStyles();

  if (price === undefined || price === null) {
    return null;
  }

  return (
    <span className={`${classes.price} w-s-n`}>
      <strong>{formatPrice(price, true)}</strong> <span>{UZS_CURRENCY}</span>
    </span>
  );
};
