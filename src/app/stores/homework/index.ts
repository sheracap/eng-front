import { createXHRStore } from "#core/effector";

import { StoreTypeWithData, StoreType } from "#core/effector/types/store";
import { api } from "#businessLogic/api";
import { XHRDataState, XHRSuccessState } from "#constructors/store";
import { PaginationListModel } from "#types/apiResponseModels";
import { PaginationList } from "#constructors/data";
import { ExerciseCreateModel, ExerciseUpdateModel } from "#businessLogic/models/exercise";


export const $homeworkDetails = createXHRStore<any, any, StoreTypeWithData<any | null>>(
  api.homework.getHomeworkDetails,
  new XHRDataState(null),
);

export const $addHomework = createXHRStore<any, number, StoreTypeWithData<number | null>>(
  api.homework.addHomework,
  new XHRDataState(null),
);

export const $updateHomework = createXHRStore<any, number, StoreTypeWithData<number | null>>(
  api.homework.updateHomework,
  new XHRDataState(null),
);

export const $deleteHomework = createXHRStore<
  number,
  any,
  StoreTypeWithData<any>
>(
  api.homework.deleteHomework,
  new XHRDataState(null),
);

export const $changeHomeworkExercisesPosition = createXHRStore<any, number, StoreType>(
  api.homework.changeHomeworkExercisesPosition,
  new XHRSuccessState(),
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
  any,
  Array<any>,
  StoreTypeWithData<Array<any>>
>(
  api.homework.getExerciseAnswersByHomework,
  new XHRDataState([])
);

export const $addHomeworkExercise = createXHRStore<ExerciseCreateModel, number, StoreTypeWithData<number | null>>(
  api.homework.addHomeworkExercise,
  new XHRDataState(null),
);

export const $updateHomeworkExercise = createXHRStore<ExerciseUpdateModel, number, StoreTypeWithData<number | null>>(
  api.homework.updateHomeworkExercise,
  new XHRDataState(null),
);

export const $deleteHomeworkExercise = createXHRStore<
  number,
  any,
  StoreTypeWithData<any>
>(
  api.homework.deleteHomeworkExercise,
  new XHRDataState(null),
);