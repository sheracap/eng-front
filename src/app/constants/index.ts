const MAIN = "/",
  HOME = "/home",
  COURSES = "/courses",
  MONITORING = "/monitoring",
  COMPANIES = "/companies",
  BRANCHES = "/branches",
  EMPLOYEES = "/employees",
  WAREHOUSE = "/warehouse",
  STOCK_IN = "/stock-in",
  STOCK_OUT = "/stock-out",
  SUPPLIERS = "/suppliers",
  CLIENTS = "/clients",
  INVOICE = "/invoice",
  USER = "/user",
  SIGN_IN = "/sign-in",
  REGISTRATION = "/registration",
  SETTINGS = "/settings",
  ADMIN = "/admin",
  CABINET = "/cabinet",
  SERVICES = "/agreements",
  EMPLOYEE_BONUSES = "/employee-bonuses";

export const ROUTES = {
  MAIN,

  HOME,

  COURSES,

  MONITORING,
  COMPANIES: MONITORING + COMPANIES,
  BRANCHES: MONITORING + BRANCHES,
  EMPLOYEES: MONITORING + EMPLOYEES,
  WAREHOUSE: MONITORING + WAREHOUSE,
  STOCK_IN: MONITORING + WAREHOUSE + STOCK_IN,
  STOCK_OUT: MONITORING + WAREHOUSE + STOCK_OUT,
  SUPPLIERS: MONITORING + SUPPLIERS,
  CLIENTS: MONITORING + CLIENTS,
  INVOICE: MONITORING + INVOICE,
  SERVICES: MONITORING + SERVICES,
  EMPLOYEE_BONUSES: MONITORING + EMPLOYEE_BONUSES,

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
export const RANGE_DATE_TIME_FORMAT_WITHOUT_TIME = "YYYY-MM-DD";
export const UZS_CURRENCY = "UZS";
