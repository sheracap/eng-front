import {
  ExerciseCreateModel, ExerciseUpdateModel
} from "#businessLogic/models/exercise";
import { HandlerType } from "#core/effector/types/handler";
import { httpGet, httpPatch, httpPost, httpPut } from "#core/httpClient";

export const addExercise: HandlerType<ExerciseCreateModel, number> = (data) => {
  return httpPost({ url: "/api/exercise", data });
};

export const updateExercise: HandlerType<ExerciseUpdateModel, number> = (data) => {
  return httpPut({ url: `/api/exercise/${data.id}`, data });
};