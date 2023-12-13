import { HandlerType } from "#core/effector/types/handler";
import { httpGet, httpPost } from "#core/httpClient";

import { CurrentUserModel, LoginPayloadType, LoginResponseType, RegistrationResponseType, RegistrationPayloadType } from "../../../models/account";

export const getCurrentUser: HandlerType<null, CurrentUserModel> = () => {
  return httpGet({
    url: "/api/user/current",
  });
};

export const logIn: HandlerType<LoginPayloadType, LoginResponseType> = (data) => {
  return httpPost({
    url: "/api/user/login",
    data,
  });
};

export const registration: HandlerType<RegistrationPayloadType, RegistrationResponseType> = (data) => {
  return httpPost({
    url: "/api/user/registration",
    data,
  });
};
