import {
  CoursesListItemModel,
  CourseDetailsModel,
  CourseCreateModel,
  CourseUpdateModel,
  CourseChapterItemModel
} from "#businessLogic/models/courses";
import { HandlerType } from "#core/effector/types/handler";
import { httpGet, httpPatch, httpPost, httpPut } from "#core/httpClient";
import { PaginationListModel } from "#types/apiResponseModels";

export const coursesList: HandlerType<void, PaginationListModel<CoursesListItemModel>> = (
  params,
) => {
  return httpGet({ url: "/api/course", params });
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
