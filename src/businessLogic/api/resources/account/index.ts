import { HandlerType } from "#core/effector/types/handler";
import { httpGet, httpPost, httpPut } from "#core/httpClient";

import { CurrentUserModel, LoginPayloadType, LoginResponseType, RegistrationResponseType, RegistrationPayloadType } from "../../../models/account";

export const getCurrentUser: HandlerType<null, CurrentUserModel> = () => {
  return httpGet({
    url: "/api/cabinet/user/current",
  });
};

export const updateUser: HandlerType<any, any> = (data) => {
  return httpPut({
    url: "/api/cabinet/user/update",
    data
  });
};

export const logIn: HandlerType<LoginPayloadType, LoginResponseType> = (data) => {
  return httpPost({
    url: "/api/cabinet/user/login",
    data,
  });
};

export const registration: HandlerType<RegistrationPayloadType, RegistrationResponseType> = (data) => {
  return httpPost({
    url: "/api/cabinet/user/registration",
    data,
  });
};

export const verifyRegistration: HandlerType<any, any> = (data) => {
  return httpPost({
    url: "/api/cabinet/user/verify",
    data,
  });
};
