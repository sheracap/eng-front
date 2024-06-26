import {
  ActiveLessonCreateModel, ActiveLessonParamsType
} from "#businessLogic/models/activeLesson";
import { HandlerType } from "#core/effector/types/handler";
import { httpDelete, httpGet, httpPost } from "#core/httpClient";

export const createActiveLesson: HandlerType<ActiveLessonCreateModel, any> = (data) => {
  return httpPost({ url: "/api/cabinet/active-lesson", data });
};

export const getActiveLesson: HandlerType<ActiveLessonParamsType, any> = (params) => {
  return httpGet({ url: "/api/cabinet/active-lesson/current", params });
};

export const deleteActiveLesson: HandlerType<void, any> = () => {
  return httpDelete({ url: "/api/cabinet/active-lesson" });
};