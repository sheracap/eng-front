
export interface CurrentUserModel {
  id: number;
  name: string;
  role: { code: "TEACHER" | "STUDENT"; name: string; };
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
