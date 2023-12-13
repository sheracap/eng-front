import { CommonShortEntityType } from "#businessLogic/models/common";

export interface CurrentUserModel {
  id: number;
  name: string;
  role: CommonShortEntityType;
}

export interface LoginPayloadType {
  password: string;
  email: string;
}

export interface LoginResponseType {
  token: string;
}

export interface RegistrationPayloadType {
  roleId: number;
  name: string;
  email: string;
}

export interface RegistrationResponseType {
  token: string;
}
