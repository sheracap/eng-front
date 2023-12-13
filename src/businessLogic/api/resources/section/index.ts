import {
  SectionDetailsModel,
  SectionCreateModel
} from "#businessLogic/models/section";
import { HandlerType } from "#core/effector/types/handler";
import { httpGet, httpPatch, httpPost, httpPut } from "#core/httpClient";

export const courseDetails: HandlerType<number, SectionDetailsModel> = (id) => {
  return httpGet({ url: `/api/section/${id}` });
};

export const addSection: HandlerType<SectionCreateModel, number> = (data) => {
  return httpPost({
    url: "/api/section",
    data
  });
};
