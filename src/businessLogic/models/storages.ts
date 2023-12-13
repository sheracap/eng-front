import { SelectOptionWithIdType } from "#types/common";

export type StoragesListParamsType = {
  search?: string;
  from?: string;
  to?: string;
  page?: number;
  pageSize?: number;
  size?: number;
  companyId?: string;
  regionId?: string;
  status?: string;
};

export type StoragesListAuxiliariesParamsType = {
  companyName?: string;
  regionName?: string;
};

export type StorageStatus = {
  id: number;
  status: string;
};

export interface StoragesListItemModel {
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
  branches: [
    {
      id: number;
      name: string;
    },
  ];
  company: {
    id: number;
    name: string;
  };
  id: number;
  name: string;
  owner: {
    firstName: string;
    id: number;
    lastName: string;
    login: string;
    patronymic: string;
    phone: string;
    pinfl: string;
    tin: string;
  };
  status: {
    code: string;
    name: string;
  };
}

export type StorageDetailsModel = StoragesListItemModel;

export type CreateStorageModel = {
  address: {
    districtId: number;
    regionId: number;
    street: string;
  };
  branches?: [number];
  companyId: number;
  id?: number;
  name: string;
  ownerId: number;
  status: {
    code: string;
    name: string;
  };
} & any;

export type UpdateStorageModel = {
  id: string | number;
} & CreateStorageModel;

export type StoragesLookupModel = Array<SelectOptionWithIdType>;
