import {
  ChapterCreateModel
} from "#businessLogic/models/chapter";
import { HandlerType } from "#core/effector/types/handler";
import { httpGet, httpPatch, httpPost, httpPut } from "#core/httpClient";

export const addChapter: HandlerType<ChapterCreateModel, any> = (data) => {
  return httpPost({ url: "/api/cabinet/chapter", data });
};
