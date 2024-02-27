import {
  ActiveLessonCreateModel, ActiveLessonParamsType
} from "#businessLogic/models/activeLesson";
import { HandlerType } from "#core/effector/types/handler";
import { httpDelete, httpGet, httpPost } from "#core/httpClient";

export const createActiveLesson: HandlerType<ActiveLessonCreateModel, any> = (data) => {
  return httpPost({ url: "/api/active-lesson", data });
};

export const getActiveLesson: HandlerType<ActiveLessonParamsType, any> = (params) => {
  return httpGet({ url: "/api/active-lesson/current", params });
};

export const deleteActiveLesson: HandlerType<number, any> = (id) => {
  return httpDelete({ url: `/api/active-lesson/${id}` });
};