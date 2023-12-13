import {
  CoursesListItemModel,
  CourseDetailsModel,
  CourseCreateModel,
  CourseUpdateModel,
  CourseChapterItemModel,
} from "#businessLogic/models/courses";
import { PaginationList } from "#constructors/data";
import { XHRDataState, XHRSuccessState } from "#constructors/store";
import { createXHRStore } from "#core/effector";
import { StoreType, StoreTypeWithData } from "#core/effector/types/store";
import { PaginationListModel } from "#types/apiResponseModels";
import { api } from "src/businessLogic/api";

export const $coursesList = createXHRStore<
  void,
  PaginationListModel<CoursesListItemModel>,
  StoreTypeWithData<PaginationListModel<CoursesListItemModel>>
>(api.courses.coursesList, new XHRDataState(new PaginationList()));

export const $myCoursesList = createXHRStore<
  void,
  PaginationListModel<CoursesListItemModel>,
  StoreTypeWithData<PaginationListModel<CoursesListItemModel>>
>(api.courses.myCoursesList, new XHRDataState(new PaginationList()));

export const $addCourse = createXHRStore<CourseCreateModel, any, StoreTypeWithData<any>>(
  api.courses.addCourse,
  new XHRDataState(null),
);

export const $updateCourse = createXHRStore<CourseUpdateModel, any, StoreTypeWithData<any>>(
  api.courses.updateCourse,
  new XHRDataState(null),
);

export const $courseDetails = createXHRStore<
  string,
  CourseDetailsModel,
  StoreTypeWithData<CourseDetailsModel>
>(api.courses.getCourseDetails, new XHRDataState(null));

export const $courseChapters = createXHRStore<
  string,
  Array<CourseChapterItemModel>,
  StoreTypeWithData<Array<CourseChapterItemModel>>
>(api.courses.getCourseChapters, new XHRDataState([]));

export const $updateChaptersOrder = createXHRStore<
  any,
  any,
  StoreType
>(api.courses.updateChaptersOrder, new XHRSuccessState());
