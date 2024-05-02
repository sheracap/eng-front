import { HandlerType } from "#core/effector/types/handler";
import { httpDelete, httpGet, httpPatch, httpPost, httpPut } from "#core/httpClient";
import { PaginationListModel } from "#types/apiResponseModels";
import { WordsParamsType } from "#businessLogic/models/vocabulary";

export const getWordsList: HandlerType<WordsParamsType, PaginationListModel<any>> = (
  params,
) => {
  return httpGet({ url: "/api/words", params });
};

export const createWord: HandlerType<any, any> = (data) => {
  return httpPost({ url: "/api/words", data })
};

export const deleteWord: HandlerType<number, any> = (id) => {
  return httpDelete({ url: `/api/words/${id}` })
};

export const getWordCategories: HandlerType<void, Array<any>> = () => {
  return httpGet({ url: "/api/words/categories", });
};

export const createWordCategory: HandlerType<any, number> = (data) => {
  return httpPost({ url: "/api/words/categories", data })
};

export const deleteWordCategory: HandlerType<number, number> = (id) => {
  return httpDelete({ url: `/api/words/categories/${id}` })
};