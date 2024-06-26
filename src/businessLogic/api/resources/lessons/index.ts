import {
  LessonItemModel,
  LessonCreateModel,
  LessonDetailsModel,
  LessonUpdateModel
} from "#businessLogic/models/lessons";
import { HandlerType } from "#core/effector/types/handler";
import { httpGet, httpPatch, httpPost, httpPut } from "#core/httpClient";

export const getLessonDetails: HandlerType<string, LessonDetailsModel> = (id) => {
  return httpGet({ url: `/api/cabinet/lesson/${id}` });
};

export const getMyLessonsByCourse: HandlerType<number, Array<LessonItemModel>> = (id) => {
  return httpGet({ url: `/api/cabinet/lesson/course/${id}` });
};

export const getLessonsByChapter: HandlerType<number, Array<LessonItemModel>> = (
  chapterId,
) => {
  return httpGet({ url: `/api/cabinet/lesson/chapter/${chapterId}` });
};

export const addLesson: HandlerType<LessonCreateModel, number> = (data) => {
  return httpPost({ url: "/api/cabinet/lesson", data });
};

export const updateLesson: HandlerType<LessonUpdateModel, number> = ({ id, data }) => {
  return httpPost({ url: `/api/cabinet/lesson/${id}`, data });
};