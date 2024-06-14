import { HandlerType } from "#core/effector/types/handler";
import { httpDelete, httpGet, httpPatch, httpPost, httpPut } from "#core/httpClient";
import { PaginationListModel } from "#types/apiResponseModels";
import {
  TextForReadingDetailsParamsTypes,
  TextForReadingItemModel,
  TextForReadingDetailsModel,
  TextForReadingParamsTypes
} from "#businessLogic/models/textForReading";


export const getTextForReadingList: HandlerType<TextForReadingParamsTypes, PaginationListModel<TextForReadingItemModel>> = (
  params,
) => {
  return httpGet({ url: "/api/text-for-reading", params });
};

export const getTextForReadingDetails: HandlerType<TextForReadingDetailsParamsTypes, TextForReadingDetailsModel> = ({ id, ...params }) => {
  return httpGet({ url: `/api/text-for-reading/${id}`, params });
};

export const createTextForReading: HandlerType<any, any> = (data) => {
  return httpPost({ url: "/api/text-for-reading", data })
};