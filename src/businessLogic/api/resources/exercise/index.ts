import {
  ExerciseAnswerCreateModel,
  ExerciseAnswerModel,
  ExerciseCreateModel, ExerciseUpdateModel
} from "#businessLogic/models/exercise";
import { HandlerType } from "#core/effector/types/handler";
import { httpDelete, httpGet, httpPatch, httpPost, httpPut } from "#core/httpClient";
import { SectionCreateModel } from "#businessLogic/models/section";

export const addExercise: HandlerType<ExerciseCreateModel, number> = ({ isHomework, ...data }) => {
  return httpPost({ url: isHomework ? "/api/homework/exercise" : "/api/exercise", data });
};

export const updateExercise: HandlerType<ExerciseUpdateModel, number> = ({ isHomework, ...data }) => {
  return httpPut({ url: isHomework ? `/api/homework/exercise/${data.id}` : `/api/exercise/${data.id}`, data });
};

export const deleteExercise: HandlerType<number, { id: number }> = (id) => {
  return httpDelete({ url: `/api/exercise/${id}` });
};

export const changeExercisesPosition: HandlerType<any, number> = (data) => {
  return httpPost({
    url: "/api/exercise/row-position",
    data
  });
};

export const getExerciseAnswersBySection: HandlerType<number, Array<ExerciseAnswerModel>> = (sectionId) => {
  return httpGet({
    url: `/api/exercise-answers/${sectionId}`,
  });
};

export const addExerciseAnswer: HandlerType<ExerciseAnswerCreateModel, any> = (data) => {
  return httpPost({
    url: "/api/exercise-answers",
    data
  });
};