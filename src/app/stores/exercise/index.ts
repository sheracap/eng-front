import {
  ExerciseCreateModel, ExerciseUpdateModel
} from "#businessLogic/models/exercise";
import { XHRDataState, XHRSuccessState } from "#constructors/store";
import { createXHRStore } from "#core/effector";
import { StoreTypeWithData, StoreType } from "#core/effector/types/store";
import { api } from "src/businessLogic/api";


export const $addExercise = createXHRStore<ExerciseCreateModel, number, StoreTypeWithData<number | null>>(
  api.exercise.addExercise,
  new XHRDataState(null),
);

export const $updateExercise = createXHRStore<ExerciseUpdateModel, number, StoreTypeWithData<number | null>>(
  api.exercise.updateExercise,
  new XHRDataState(null),
);

export const $deleteExercise = createXHRStore<number, any, StoreTypeWithData<any>>(
  api.exercise.deleteExercise,
  new XHRDataState(null),
);
