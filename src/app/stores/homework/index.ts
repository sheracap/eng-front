import { createXHRStore } from "#core/effector";

import { StoreTypeWithData, StoreType } from "#core/effector/types/store";
import { api } from "#businessLogic/api";
import { XHRDataState, XHRSuccessState } from "#constructors/store";
import { PaginationListModel } from "#types/apiResponseModels";
import { PaginationList } from "#constructors/data";


export const $homeworkDetails = createXHRStore<any, any, StoreTypeWithData<any | null>>(
  api.homework.getHomeworkDetails,
  new XHRDataState(null),
);
export const $addHomework = createXHRStore<any, number, StoreTypeWithData<number | null>>(
  api.homework.addHomework,
  new XHRDataState(null),
);

export const $lessonHomeworks = createXHRStore<number, any, StoreTypeWithData<Array<any>>>(
  api.homework.getLessonHomeworks,
  new XHRDataState([]),
);

export const $assignHomework = createXHRStore<any, any, StoreType>(
  api.homework.assignHomework,
  new XHRSuccessState(),
);

export const $homeworkAssignments = createXHRStore<
  any,
  PaginationListModel<any>,
  StoreTypeWithData<PaginationListModel<any>>
>(api.homework.getHomeworkAssignments, new XHRDataState(new PaginationList()));

export const $addHomeworkExerciseAnswer = createXHRStore<any, number, StoreType>(
  api.homework.addHomeworkExerciseAnswer,
  new XHRSuccessState(),
);

export const $exerciseAnswersByHomework = createXHRStore<
  number,
  Array<any>,
  StoreTypeWithData<Array<any>>
>(
  api.homework.getExerciseAnswersByHomework,
  new XHRDataState([])
);