import {
  LessonItemModel,
  LessonCreateModel,
  LessonDetailsModel,
  LessonUpdateModel
} from "#businessLogic/models/lessons";
import { HandlerType } from "#core/effector/types/handler";
import { httpDelete, httpGet, httpPatch, httpPost, httpPut } from "#core/httpClient";
import { PaginationListModel } from "#types/apiResponseModels";
import { LessonsListItemModel } from "#businessLogic/models/lessons";

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

export const addLesson: HandlerType<LessonCreateModel, any> = (data) => {
  return httpPost({ url: "/api/cabinet/lesson", data });
};

export const updateLesson: HandlerType<LessonUpdateModel, number> = ({ id, data }) => {
  return httpPut({ url: `/api/cabinet/lesson/${id}`, data });
};

export const deleteLesson: HandlerType<number, number> = (id) => {
  return httpDelete({ url: `/api/cabinet/lesson/${id}` });
};

export const getLessonsList: HandlerType<void, PaginationListModel<LessonsListItemModel>> = (
  params,
) => {
  return httpGet({ url: "/api/cabinet/lesson", params });
};

export const getMyLessonsList: HandlerType<void, PaginationListModel<LessonsListItemModel>> = (
  params,
) => {
  return httpGet({ url: "/api/cabinet/lesson/current", params });
};