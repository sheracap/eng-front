import { createXHRStore } from "#core/effector";
import {
  LessonItemModel,
  LessonsByChapterDataModel,
  LessonCreateModel,
  LessonDetailsModel, LessonUpdateModel
} from "#businessLogic/models/lessons";
import { StoreTypeWithData } from "#core/effector/types/store";
import { api } from "#businessLogic/api";
import { XHRDataState } from "#constructors/store";
import { PaginationListModel } from "#types/apiResponseModels";
import { LessonsListItemModel } from "#businessLogic/models/lessons";
import { PaginationList } from "#constructors/data";

export const $lessonDetails = createXHRStore<string, LessonDetailsModel, StoreTypeWithData<LessonDetailsModel | null>>(
  api.lessons.getLessonDetails,
  new XHRDataState(null),
);

export const $myLessonsByCourse = createXHRStore<number, Array<LessonItemModel>, StoreTypeWithData<Array<LessonItemModel>>>(
  api.lessons.getMyLessonsByCourse,
  new XHRDataState([]),
);

export const $lessonsByChapter = createXHRStore<
  number,
  Array<LessonItemModel>,
  StoreTypeWithData<LessonsByChapterDataModel>
>(
  api.lessons.getLessonsByChapter,
  new XHRDataState({}),
  {
    doneReducer: (state, response) => {
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          [response.params]: response.result.data,
        },
        error: null,
      };
    },
  }
);

export const $addLesson = createXHRStore<LessonCreateModel, any, StoreTypeWithData<any>>(
  api.lessons.addLesson,
  new XHRDataState(null),
);

export const $updateLesson = createXHRStore<LessonUpdateModel, number, StoreTypeWithData<number | null>>(
  api.lessons.updateLesson,
  new XHRDataState(null),
);

export const $deleteLesson = createXHRStore<number, number, StoreTypeWithData<number | null>>(
  api.lessons.deleteLesson,
  new XHRDataState(null),
);

export const $lessonsList = createXHRStore<
  void,
  PaginationListModel<LessonsListItemModel>,
  StoreTypeWithData<PaginationListModel<LessonsListItemModel>>
>(api.lessons.getLessonsList, new XHRDataState(new PaginationList()));

export const $myLessonsList = createXHRStore<
  void,
  PaginationListModel<LessonsListItemModel>,
  StoreTypeWithData<PaginationListModel<LessonsListItemModel>>
>(api.lessons.getMyLessonsList, new XHRDataState(new PaginationList()));