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
  return httpGet({ url: "/api/cabinet/course", params });
};

export const myCoursesList: HandlerType<void, PaginationListModel<CoursesListItemModel>> = (
  params,
) => {
  return httpGet({ url: "/api/cabinet/course/current", params });
};

export const addCourse: HandlerType<CourseCreateModel, any> = (data) => {
  return httpPost({ url: "/api/cabinet/course", data });
};

export const deleteCourse: HandlerType<number, any> = (id) => {
  return httpDelete({ url: `/api/cabinet/course/${id}` });
};

export const updateCourse: HandlerType<CourseUpdateModel, any> = ({ id, data }) => {
  return httpPut({ url: `/api/cabinet/course/${id}`, data });
};

export const getCourseDetails: HandlerType<number, CourseDetailsModel> = (id) => {
  return httpGet({ url: `/api/cabinet/course/${id}` });
};

export const getCourseChapters: HandlerType<number, Array<CourseChapterItemModel>> = (courseId) => {
  return httpGet({ url: `/api/cabinet/chapter/by-course/${courseId}` });
};

export const updateChaptersOrder: HandlerType<any, Array<CourseChapterItemModel>> = ({ courseId, data }) => {
  return httpPut({
    url: `/api/cabinet/chapter/by-course/position/${courseId}`,
    data
  });
};
