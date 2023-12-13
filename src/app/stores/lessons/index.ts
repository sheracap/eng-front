import { createXHRStore } from "#core/effector";
import {
  LessonItemModel,
  LessonsByChapterDataModel,
  LessonCreateModel,
  LessonDetailsModel
} from "#businessLogic/models/lessons";
import { StoreTypeWithData } from "#core/effector/types/store";
import { api } from "#businessLogic/api";
import { XHRDataState } from "#constructors/store";

export const $lessonDetails = createXHRStore<string, LessonDetailsModel, StoreTypeWithData<LessonDetailsModel | null>>(
  api.lessons.getLessonDetails,
  new XHRDataState(null),
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

export const $addLesson = createXHRStore<LessonCreateModel, number, StoreTypeWithData<number | null>>(
  api.lessons.addLesson,
  new XHRDataState(null),
);