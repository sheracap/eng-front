import React from "react";

import { PriceWrapper } from "#ui/priceWrapper";
import { getAgreementPrice, getTariffPrice, getTariffRecurringModel } from "#utils/formatters";

export const ServicePrice = (props) => {
  const { agreement: agreementProp, tariff, activeBranches } = props;

  const instances = activeBranches;

  let price = 0;
  let recurring;

  const agreement = {
    ...agreementProp,
    instances,
  };

  if (agreementProp) {
    price = agreement.total ? agreement.total : getAgreementPrice(agreement);
    recurring = getTariffRecurringModel(agreement.xizmat);
  } else if (tariff) {
    price = getTariffPrice(tariff);
    recurring = getTariffRecurringModel(tariff);
  }

  return (
    <span className="w-s-n">
      <PriceWrapper price={price} />
      {recurring}
    </span>
  );
};
