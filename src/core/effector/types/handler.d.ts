import { AxiosPromise } from "axios";

export type HandlerType<P, R> = P extends null ? () => AxiosPromise<R> : (params: P) => AxiosPromise<R>;
