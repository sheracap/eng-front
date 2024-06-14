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

export type LanguageLevel = "a1" | "a2" | "b1" | "b2" | "c1" | "c2";
