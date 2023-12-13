export type CommonShortEntityType = {
  id: number;
  name: string;
};

export type RegionListType = Array<CommonShortEntityType>;

export type DistrictListType = Array<CommonShortEntityType>;

export type ActivitySelectType = Array<CommonShortEntityType>;

export type RolesType = Array<CommonShortEntityType>;

export type DistrictsParamsType = {
  regionId: string | number;
};

export interface StockProductCodesItem {
  checked: boolean;
  code: string;
  errorMessage: null | string;
}
