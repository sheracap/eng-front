import { HandlerType } from "#core/effector/types/handler";
import { httpDelete, httpGet, httpPatch, httpPost, httpPut } from "#core/httpClient";
import { PaginationListModel } from "#types/apiResponseModels";
import {
  CreateWordModel,
  WordCategoryItemModel,
  WordItemModel,
  WordsParamsType
} from "#businessLogic/models/vocabulary";

export const getWordsList: HandlerType<WordsParamsType, PaginationListModel<WordItemModel>> = (
  params,
) => {
  return httpGet({ url: "/api/cabinet/words", params });
};

export const getRandomWordsList: HandlerType<void, Array<WordItemModel>> = () => {
  return httpGet({ url: "/api/cabinet/words/random" });
};

export const createWord: HandlerType<CreateWordModel, WordItemModel> = (data) => {
  return httpPost({ url: "/api/cabinet/words", data })
};

export const deleteWord: HandlerType<number, any> = (id) => {
  return httpDelete({ url: `/api/cabinet/words/${id}` })
};

export const getWordCategories: HandlerType<void, Array<WordCategoryItemModel>> = () => {
  return httpGet({ url: "/api/cabinet/words/category", });
};

export const createWordCategory: HandlerType<any, WordCategoryItemModel> = (data) => {
  return httpPost({ url: "/api/cabinet/words/category", data })
};

export const deleteWordCategory: HandlerType<number, number> = (id) => {
  return httpDelete({ url: `/api/cabinet/words/category/${id}` })
};