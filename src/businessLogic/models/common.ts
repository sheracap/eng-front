export type CommonShortEntityType = {
  id: number;
  name: string;
};

export type RegionListType = Array<CommonShortEntityType>;

export type DistrictListType = Array<CommonShortEntityType>;

export type RolesType = Array<CommonShortEntityType>;

export type DistrictsParamsType = {
  regionId: string | number;
};
