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
  return httpGet({ url: "/api/cabinet/text-for-reading", params });
};

export const getTextForReadingDetails: HandlerType<TextForReadingDetailsParamsTypes, TextForReadingDetailsModel> = ({ id, ...params }) => {
  return httpGet({ url: `/api/cabinet/text-for-reading/${id}`, params });
};


// ADMIN
export const createTextForReading: HandlerType<any, any> = (data) => {
  return httpPost({ url: "/api/admin/text-for-reading", data })
};