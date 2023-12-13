export type ClientsListParamsType = {
  search?: string;
  page?: number;
  pageSize?: number;
  size?: number;
  companyId?: string;
};

export type ClientsListAuxiliariesParamsType = {
  companyName?: string;
};

export interface ClientsListItemModel {
  activityType: {
    id: number;
    name: string;
  };
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
  brand: string;
  contactPerson: string;
  customerBranchCount: number;
  id: number;
  name: string;
  phone: string;
  status: {
    code: string;
    name: string;
  };
  tin: string;
}

export type ClientCreateModel = {
  companyId: number | string | undefined;
  tin: string | undefined;
  name: string;
  phone: string;
  contactPerson: string;
  brand?: string;
  activityTypeId?: number;
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
    id: number | undefined;
    bankId: number;
    accountNumber: string;
    oked: string;
    main: boolean;
  };
};

export type ClientUpdateDetailsModel = {
  id: number | string;
} & ClientCreateModel;

export interface ClientCheckModel {
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
  ownerDTO: {
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

export type ClientLookupParamsType = {
  search?: string;
  companyId?: string;
};

export interface ClientLookupItemModel {
  id: number;
  name: string;
  tin: string;
}

export type ClientDetailsModel = {
  bankDetail: any;
  activityType: {
    id: number;
    name: string;
    parent: {
      id: number;
      name: string;
    };
    parentId: number;
  };
} & ClientsListItemModel;
