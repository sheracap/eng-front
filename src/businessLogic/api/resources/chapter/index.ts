import {
  ChapterCreateModel,
  ChapterUpdateModel
} from "#businessLogic/models/chapter";
import { HandlerType } from "#core/effector/types/handler";
import { httpGet, httpPatch, httpPost, httpPut, httpDelete } from "#core/httpClient";

export const addChapter: HandlerType<ChapterCreateModel, any> = (data) => {
  return httpPost({ url: "/api/cabinet/chapter", data });
};

export const updateChapter: HandlerType<ChapterUpdateModel, any> = (data) => {
  return httpPut({ url: `/api/cabinet/chapter/${data.id}`, data });
};

export const deleteChapter: HandlerType<number, any> = (id) => {
  return httpDelete({ url: `/api/cabinet/chapter/${id}` });
};
