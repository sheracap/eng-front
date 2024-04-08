import {
  ExerciseCreateModel, ExerciseUpdateModel
} from "#businessLogic/models/exercise";
import { HandlerType } from "#core/effector/types/handler";
import { httpDelete, httpGet, httpPatch, httpPost, httpPut } from "#core/httpClient";
import { SectionCreateModel } from "#businessLogic/models/section";

export const addExercise: HandlerType<ExerciseCreateModel, number> = (data) => {
  return httpPost({ url: "/api/exercise", data });
};

export const updateExercise: HandlerType<ExerciseUpdateModel, number> = (data) => {
  return httpPut({ url: `/api/exercise/${data.id}`, data });
};

export const deleteExercise: HandlerType<number, { id: number }> = (id) => {
  return httpDelete({ url: `/api/exercise/${id}` });
};

export const changeExercisesPosition: HandlerType<SectionCreateModel, number> = (data) => {
  return httpPost({
    url: "/api/exercise/row-position",
    data
  });
};