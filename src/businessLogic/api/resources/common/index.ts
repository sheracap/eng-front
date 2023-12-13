import { DistrictListType, DistrictsParamsType, RegionListType } from "#businessLogic/models/common";
import { HandlerType } from "#core/effector/types/handler";
import { httpGet } from "#core/httpClient";



export const getRoles: HandlerType<null, RegionListType> = () => {
  return httpGet({
    url: "/api/role",
  });
};
