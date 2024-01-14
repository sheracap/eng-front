import {
  CoursesListItemModel,
  CourseDetailsModel,
  CourseCreateModel,
  CourseUpdateModel,
  CourseChapterItemModel
} from "#businessLogic/models/courses";
import { HandlerType } from "#core/effector/types/handler";
import { httpDelete, httpGet, httpPatch, httpPost, httpPut } from "#core/httpClient";
import { PaginationListModel } from "#types/apiResponseModels";

export const coursesList: HandlerType<void, PaginationListModel<CoursesListItemModel>> = (
  params,
) => {
  return httpGet({ url: "/api/course", params });
};

export const getTomatoes: HandlerType<any, any> = (
  params,
) => {
  return httpGet({ url: "/api/tomato", params });
};

export const createTomato: HandlerType<any, any> = (
  data,
) => {
  return httpPost({ url: "/api/tomato", data });
};

export const updateTomato: HandlerType<any, any> = (
  data,
) => {
  return httpPut({ url: `/api/tomato/${data.id}`, data });
};

export const delteTomato: HandlerType<any, any> = (
  data,
) => {
  return httpDelete({ url: `/api/tomato/${data.id}`, });
};

export const myCoursesList: HandlerType<void, PaginationListModel<CoursesListItemModel>> = (
  params,
) => {
  return httpGet({ url: "/api/course/current", params });
};

export const addCourse: HandlerType<CourseCreateModel, any> = (data) => {
  return httpPost({ url: "/api/course", data });
};

export const updateCourse: HandlerType<CourseUpdateModel, any> = ({ id, data }) => {
  return httpPut({ url: `/api/course/${id}`, data });
};

export const getCourseDetails: HandlerType<string, CourseDetailsModel> = (id) => {
  return httpGet({ url: `/api/course/${id}` });
};

export const getCourseChapters: HandlerType<string, Array<CourseChapterItemModel>> = (courseId) => {
  return httpGet({ url: `/api/chapter/by-course/${courseId}` });
};

export const updateChaptersOrder: HandlerType<any, Array<CourseChapterItemModel>> = ({ courseId, data }) => {
  return httpPut({
    url: `/api/chapter/by-course/position/${courseId}`,
    data
  });
};
