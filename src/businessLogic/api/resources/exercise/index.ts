import {
  ExerciseAnswerCreateModel,
  ExerciseAnswerModel,
  ExerciseUpdateModel
} from "#businessLogic/models/exercise";
import { HandlerType } from "#core/effector/types/handler";
import { httpDelete, httpGet, httpPatch, httpPost, httpPut } from "#core/httpClient";

export const addExercise: HandlerType<any, number> = (data) => {
  return httpPost({
    url: "/api/cabinet/exercise",
    data,
  });
};

export const updateExercise: HandlerType<ExerciseUpdateModel, number> = ({ id, data }) => {
  return httpPut({ url: `/api/cabinet/exercise/${id}`, data });
};

export const deleteExercise: HandlerType<number, { id: number }> = (id) => {
  return httpDelete({ url: `/api/cabinet/exercise/${id}` });
};

export const changeExercisesPosition: HandlerType<any, number> = (data) => {
  return httpPost({
    url: "/api/cabinet/exercise/row-position",
    data
  });
};

export const getExerciseAnswersBySection: HandlerType<number, Array<ExerciseAnswerModel>> = (sectionId) => {
  return httpGet({
    url: `/api/cabinet/exercise-answers/${sectionId}`,
  });
};

export const getStudentExerciseAnswersBySection: HandlerType<any, Array<ExerciseAnswerModel>> = ({ studentId, sectionId }) => {
  return httpGet({
    url: `/api/cabinet/exercise-answers/${studentId}/${sectionId}`,
  });
};

export const addExerciseAnswer: HandlerType<ExerciseAnswerCreateModel, any> = (data) => {
  return httpPost({
    url: "/api/cabinet/exercise-answers",
    data
  });
};