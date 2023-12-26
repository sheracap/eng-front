const MAIN = "/",
  HOME = "/home",
  COURSES = "/courses",
  MONITORING = "/monitoring",
  USER = "/user",
  SIGN_IN = "/sign-in",
  REGISTRATION = "/registration",
  SETTINGS = "/settings",
  ADMIN = "/admin",
  CABINET = "/cabinet";

export const ROUTES = {
  MAIN,

  HOME,

  COURSES,

  MONITORING,

  SETTINGS,
  ADMIN: SETTINGS + ADMIN,
  CABINET: SETTINGS + CABINET,

  USER,
  USER_SIGN_IN: USER + SIGN_IN,

  USER_REGISTRATION: USER + REGISTRATION,
};

export const ACCESS_TOKEN_KEY_FOR_COOKIE = "access_token";
export const REFRESH_TOKEN_KEY_FOR_COOKIE = "refresh_token";

export const requiredRules = [{ required: true, message: "Не заполнено поле" }];

export const RANGE_DATE_FORMAT = "YYYY-MM-DD";
export const RANGE_DATE_TIME_FORMAT = "YYYY-MM-DDTHH:mm";

export const templateTypes = {
  TEST: "TEST",
  TEXT_BLOCK: "TEXT_BLOCK",
  BLANK: "BLANK",
  FILL_TEXT: "FILL_TEXT"
};
