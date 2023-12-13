import { SelectOptionWithIdType } from "#types/common";

type BanksLookupItemModal = {
  mfo: string;
} & SelectOptionWithIdType;

export type BankLookupParamsType = {
  search?: string;
};

export type BanksLookupModel = Array<BanksLookupItemModal>;
