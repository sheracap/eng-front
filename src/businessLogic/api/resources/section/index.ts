import {
  SectionDetailsModel,
  SectionCreateModel, SectionUpdateModel
} from "#businessLogic/models/section";
import { HandlerType } from "#core/effector/types/handler";
import { httpDelete, httpGet, httpPatch, httpPost, httpPut } from "#core/httpClient";

export const courseDetails: HandlerType<number, SectionDetailsModel> = (id) => {
  return httpGet({ url: `/api/cabinet/section/${id}` });
};

export const addSection: HandlerType<SectionCreateModel, number> = (data) => {
  return httpPost({
    url: "/api/cabinet/section",
    data
  });
};

export const updateSection: HandlerType<SectionUpdateModel, number> = (data) => {
  return httpPut({
    url: `/api/cabinet/section/${data.id}`,
    data
  });
};

export const deleteSection: HandlerType<number, number> = (id) => {
  return httpDelete({
    url: `/api/cabinet/section/${id}`,
  });
};
