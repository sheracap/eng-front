import { SelectOptionType } from "#types/common";

export type CompaniesListParamsType = {
  search?: string;
  from?: string;
  to?: string;
  status?: string;
  page?: number;
  pageSize?: number;
  size?: number;
  companyId?: string;
};

export type CompaniesListAuxiliariesParamsType = {
  companyName?: string;
};

export type CompanyLookupParamsType = {
  search?: string;
};

export interface CompanyListItemModel {
  id: number;
  name: string;
  tin: string;
  registrationDate: string;
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
  manager: null | {
    id: number;
    name: string;
  };
  status: {
    name: string;
    code: string;
  };
}

export interface CompanyDetailsModel extends CompanyListItemModel {
  activeBranches: number;
  activityType: {
    id: number;
    name: string;
    parent: {
      id: number;
      name: string;
    };
  };
  address: {
    region: {
      id: number;
      name: string;
    };
    district: {
      id: number;
      name: string;
    };
    street: string;
    house: string;
    apartment: string;
    longitude: string;
    latitude: string;
  };
  bank: {
    id: number;
    name: string;
    accountNumber: number;
    mfo: number;
    oked: number;
  };
  productGroup: string;
  freeTrial: boolean;
  businessType: {
    name: string;
    code: string;
  };
  companyType: {
    name: string;
    code: string;
  } | null;
  street: string;
}

export interface CompanyCreateModel {
  activityType: {
    id: number;
    name?: string;
    parent?: {
      id: number;
      name?: string;
    };
  };
  address: {
    apartment?: string;
    districtId: number;
    house?: string;
    latitude?: string;
    longitude?: string;
    regionId: number;
    street: string;
  };
  businessType: {
    code: string;
    name?: string;
  };
  companyType: {
    code: string;
    name?: string;
  };
  factoryCountry?: string;
  factoryId?: string;
  id?: number | string;
  login: string;
  name: string;
  productGroup?: string;
  tin: string | undefined;
}

export type CompanyUpdateModel = CompanyCreateModel;

export interface CompanyStatisticsModel {
  totalBranch: number;
  totalWarehouse: number;
  totalOrder: number;
  totalStockIncoming: number;
  totalStockOutgoing: number;
  totalInvoice: number;
}

export interface CompanyLookupItemModel {
  id: string;
  name: string;
  company?: any;
}

export type CompanyStatusesModel = Array<SelectOptionType>;

export type CompanyStatusUpdateModel = {
  id?: number;
  status: string;
};

export interface CompanyCheckModel {
  account: string | null;
  accountant: string | null;
  address: string | null;
  branchName: string | null;
  branchNum: string | null;
  director: string | null;
  directorTin: string | null;
  firstName: string | null;
  fullName: string | null;
  lastName: string | null;
  mfo: string | null;
  mobile: string | null;
  name: string | null;
  ns10Code: number | null;
  ns11Code: number | null;
  oked: string | null;
  passIssueDate: string | null;
  passNumber: string | null;
  passOrg: string | null;
  passSeries: string | null;
  patronymic: string | null;
  personalNum: string | null;
  shortName: string | null;
  statusCode: number | null;
  statusName: string | null;
  tin: string | null;
  workPhone: string | null;
}

export interface AggregationCreateModel {
  aslBelgiToken?: string;
  aslBelgiTokenDate?: string;
  companyId?: string | number;
  contactPerson: string;
  factoryCountry?: string;
  factoryId?: string;
  gcp: string;
  omsId: string;
  turonToken: string;
}

export interface CompanyBankCreateModel {
  accountNumber: string;
  bankId: number;
  companyId: number;
  oked: string;
}

export interface CompanyBankUpdateModel {
  id: number;
  bank: {
    id: number;
    name: string;
    mfo: string;
  };
  parentBank: {
    id: number;
    name: string;
    mfo: string;
  };
  accountNumber?: string;
  oked?: string;
}

export type CompanyUpdateManager = {
  companyId: number;
  managerId: number;
};

export type BusinessTypesItemModel = Array<SelectOptionType>;
export type CompanyTypesItemModel = Array<SelectOptionType>;
