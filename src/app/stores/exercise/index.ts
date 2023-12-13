import {
  ExerciseCreateModel
} from "#businessLogic/models/exercise";
import { XHRDataState, XHRSuccessState } from "#constructors/store";
import { createXHRStore } from "#core/effector";
import { StoreType, StoreTypeWithData } from "#core/effector/types/store";
import { api } from "src/businessLogic/api";


export const $addExercise = createXHRStore<ExerciseCreateModel, number, StoreTypeWithData<number | null>>(
  api.exercise.addExercise,
  new XHRDataState(null),
);
