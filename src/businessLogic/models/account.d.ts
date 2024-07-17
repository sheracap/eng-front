
export interface CurrentUserModel {
  id: number;
  name: string;
  email: string;
  img: null | string;
  role: { code: "TEACHER" | "STUDENT"; name: string; };
  teacherId: number | null;
  language: "ENGLISH" | "KOREAN";
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
