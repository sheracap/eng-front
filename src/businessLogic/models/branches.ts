import { SelectOptionType } from "#types/common";

export type BranchesListParamsType = {
  search?: string;
  from?: string;
  to?: string;
  status?: string;
  page?: number;
  pageSize?: number;
  size?: number;
  companyId?: string;
};

export type BranchesListAuxiliariesParamsType = {
  companyName?: string;
};

export type BranchesLookupParamsType = {
  search?: string;
  companyId?: number | string;
};

export type CategoryBranchesLookupParamsType = {
  companyId: number | string;
};

export interface BranchListItemModel {
  id: number;
  name: string;
  main: boolean;
  address: null | {
    apartment: null | string;
    district: {
      id: number;
      name: string;
    };
    region: {
      id: number;
      name: string;
    };
    house: null | string;
    latitude: null | string;
    longitude: null | string;
    street: null | string;
  };
  owner: null | {
    id: number;
    firstName: string | null;
    lastName: string | null;
    patronymic: string | null;
    login: string;
    phone: string;
    tin: string;
    pinfl: string | null;
  };
  company: {
    id: number;
    name: string;
    tin: string;
  };
  status: {
    name: string;
    code: string;
  };
  type: null | {
    code: string;
    name: string;
  };
}

interface BranchesLookupItemModel {
  id: number;
  name: string;
  main: boolean;
}

export type BranchDetailsModel = BranchListItemModel;

export type BranchCreateModel = {
  companyId: number | string;
  name: string;
  address: {
    regionId: string;
    districtId: string;
    street: string;
  };
  type: string;
  main: boolean;
};

export type BranchUpdateModel = {
  id: string | number;
} & BranchCreateModel;

export type BranchTypeItemModel = Array<SelectOptionType>;

export type BranchStatusesModel = Array<SelectOptionType>;

export type BranchesLookupModel = Array<BranchesLookupItemModel>;
