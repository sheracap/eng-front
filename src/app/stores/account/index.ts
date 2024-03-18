import {
  CurrentUserModel,
  LoginPayloadType,
  LoginResponseType,
  RegistrationPayloadType,
  RegistrationResponseType
} from "#businessLogic/models/account";
import { XHRDataState, XHRSuccessState } from "#constructors/store";
import { createXHRStore } from "#core/effector";
import { StoreType, StoreTypeWithData } from "#core/effector/types/store";
import Cookies from "js-cookie";
import { api } from "src/businessLogic/api";

import { ACCESS_TOKEN_KEY_FOR_COOKIE } from "../../constants";

export const $currentUser = createXHRStore<null, CurrentUserModel, StoreTypeWithData<CurrentUserModel | null>>(
  api.account.getCurrentUser,
  new XHRDataState(null),
);

export const $logIn = createXHRStore<LoginPayloadType, LoginResponseType, StoreType>(
  api.account.logIn,
  new XHRSuccessState(),
  {
    doneReducer: (state, response) => {
      Cookies.set(ACCESS_TOKEN_KEY_FOR_COOKIE, response.result.data.token);
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
      };
    },
  },
);

export const $registration = createXHRStore<RegistrationPayloadType, RegistrationResponseType, StoreType>(
  api.account.registration,
  new XHRSuccessState(),
);