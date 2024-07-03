import { ACCESS_TOKEN_KEY_FOR_COOKIE, ROUTES } from "#constants/index";
import { notificationError } from "#ui/notifications";
import axios, { AxiosPromise, AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import { history } from "src/app/history";

const httpClient = axios.create({
  withCredentials: true,
});

httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const stopReaction = error.response.config.headers?.stopReaction;

    if (!stopReaction) {
      const status = (error.response && error.response.status) || 0;

      if (status === 401) {
        history.push(ROUTES.USER_SIGN_IN);
      } else if (status === 403) {
        notificationError("Ошибка", "У вас нет необходимого разрешения. Пожалуйста, свяжитесь с вашим администратором");
      } else if (status >= 400) {
        if (error.response) {
          notificationError("Ошибка", error.response.data.title || error.response.data.message);
        }
      }
    }

    return Promise.reject(error);
  },
);

httpClient.interceptors.request.use((config) => {
  const token = Cookies.get(ACCESS_TOKEN_KEY_FOR_COOKIE);

  if (token) {
    config.headers = Object.assign(config.headers, { Authorization: "Bearer " + token });
    return config;
  } else {
    return config;
  }
});

type HttpRequestType = <R>(params: AxiosRequestConfig) => AxiosPromise<R>;

export const httpGet: HttpRequestType = (params) =>
  httpClient({
    method: "get",
    ...params,
  });

export const httpPost: HttpRequestType = (params) =>
  httpClient({
    method: "post",
    ...params,
  });

export const httpPut = (params: any) =>
  httpClient({
    method: "put",
    ...params,
  });

export const httpPatch = (params: any) =>
  httpClient({
    method: "patch",
    ...params,
  });

export const httpDelete = (params: any) =>
  httpClient({
    method: "delete",
    ...params,
  });
