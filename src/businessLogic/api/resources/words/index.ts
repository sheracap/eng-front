import { HandlerType } from "#core/effector/types/handler";
import { httpDelete, httpGet, httpPatch, httpPost, httpPut } from "#core/httpClient";
import { PaginationListModel } from "#types/apiResponseModels";

export const getWordsList: HandlerType<any, PaginationListModel<any>> = (
  params,
) => {
  return httpGet({ url: "/api/words", params });
};