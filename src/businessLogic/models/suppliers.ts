export type SuppliersListParamsType = {
  search?: string;
  page?: number;
  pageSize?: number;
  size?: number;
  companyId?: string;
};

export type SuppliersListAuxiliariesParamsType = {
  companyName?: string;
};

export type SupplierLookupParamsType = {
  search?: string;
  role?: string;
};

export interface SupplierLookupItemModel {
  id: number;
  name: string;
  tin: string;
}

export type SupplierLookupModel = Array<SupplierLookupItemModel>;

type regionListItemModal = {
  id: number | string;
  name: string;
};

type districtListItemModal = {
  id: number | string;
  name: string;
};

export interface SupplierListItemModel {
  address: {
    apartment: string;
    district: districtListItemModal;
    house: string;
    latitude: string;
    longitude: string;
    region: regionListItemModal;
    street: string;
  };
  contactPerson: string;
  id: number;
  name: string;
  phone: string;
  tin: string;
  company?: number | string;
}

export type SupplierCreateModel = {
  companyId: number | string | undefined;
  tin: string | undefined;
  name: string;
  contactPerson: string;
  phone: string;
  address: {
    regionId: number;
    districtId: number;
    street: string;
    apartment?: string;
    house?: string;
    latitude?: string;
    longitude?: string;
  };
  bank: {
    id: number;
    bankId: number;
    accountNumber: string;
    oked: string;
    main: boolean;
  };
};

export type SupplierUpdateModel = {
  id: number | string;
} & SupplierCreateModel;

export interface SupplierCheckModel {
  address: {
    apartment: string;
    district: {
      id: number;
      name: string;
    };
    house: string;
    latitude: string;
    longitude: string;
    region: {
      id: number;
      name: string;
    };
    street: string;
  };
  bankDetail: {
    accountNumber: string;
    bank: {
      id: number;
      mfo: string;
      name: string;
    };
    id: number;
    main: boolean;
    oked: string;
    parentBank: {
      id: number;
      mfo: string;
      name: string;
    };
  };
  businessType: {
    code: string;
    name: string;
  };
  gcp: string;
  id: number;
  name: string;
  omsId: string;
  DTO: {
    firstName: string;
    id: number;
    lastName: string;
    login: string;
    patronymic: string;
    phone: string;
    pinfl: string;
    tin: string;
  };
  phone: string;
  tin: string;
  turonToken: string;
}
