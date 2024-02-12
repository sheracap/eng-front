import { RolesType } from "#businessLogic/models/common";
import { XHRDataState } from "#constructors/store";
import { createXHRStore } from "#core/effector";
import { StoreTypeWithData } from "#core/effector/types/store";
import { api } from "src/businessLogic/api";



export const $roles = createXHRStore<null, RolesType, StoreTypeWithData<RolesType>>(
  api.common.getRoles,
  new XHRDataState([]),
);