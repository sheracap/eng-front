const MAIN = "/",
  HOME = "/home",
  COURSES = "/courses",
  EVENTS = "/events",
  LESSONS = "/lessons",
  STUDENTS = "/students",
  BOOKS = "/books",
  MONITORING = "/monitoring",
  VOCABULARY = "/vocabulary",
  PRONUNCIATION = "/pronunciation",
  HOMEWORK = "/homework",
  USER = "/user",
  SIGN_IN = "/sign-in",
  REGISTRATION = "/registration",
  FORGOT_PASSWORD = "/forgot-password",
  SETTINGS = "/settings",
  ADMIN = "/admin",
  CABINET = "/cabinet";

export const ROUTES = {
  MAIN,

  HOME,

  COURSES,

  EVENTS,

  LESSONS,

  STUDENTS,

  BOOKS,

  MONITORING,

  VOCABULARY,
  PRONUNCIATION,
  HOMEWORK,

  SETTINGS,
  ADMIN: SETTINGS + ADMIN,
  CABINET: SETTINGS + CABINET,

  USER,
  USER_SIGN_IN: USER + SIGN_IN,

  USER_REGISTRATION: USER + REGISTRATION,

  USER_FORGOT_PASSWORD: USER + FORGOT_PASSWORD,
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
  FILL_TEXT: "FILL_TEXT",
  VIDEO: "VIDEO",
  IMAGES: "IMAGES",
  FILL_IMAGES: "FILL_IMAGES",
  AUDIO: "AUDIO"
};

export const imagesBaseUrl = "https://english-lab.s3.eu-north-1.amazonaws.com";
