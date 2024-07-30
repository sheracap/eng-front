import { HandlerType } from "#core/effector/types/handler";
import { httpDelete, httpGet, httpPost, httpPut } from "#core/httpClient";
import { PaginationListModel } from "#types/apiResponseModels";
import { ExerciseAnswerModel, ExerciseCreateModel, ExerciseUpdateModel } from "#businessLogic/models/exercise";

export const getHomeworkDetails: HandlerType<any, any> = (id) => {
  return httpGet({ url: `/api/cabinet/homework/details/${id}` });
};

export const addHomework: HandlerType<any, number> = (data) => {
  return httpPost({ url: "/api/cabinet/homework", data });
};

export const updateHomework: HandlerType<any, number> = (data) => {
  return httpPut({ url: `/api/cabinet/homework/${data.id}`, data });
};

export const deleteHomework: HandlerType<number, any> = (id) => {
  return httpDelete({ url: `/api/cabinet/homework/${id}` });
};

export const changeHomeworkExercisesPosition: HandlerType<any, number> = (data) => {
  return httpPost({
    url: "/api/cabinet/homework/row-position",
    data
  });
};

export const getLessonHomeworks: HandlerType<number, number> = (lessonId) => {
  return httpGet({ url: `/api/cabinet/homework/by-lesson/${lessonId}` });
};

export const assignHomework: HandlerType<any, any> = (data) => {
  return httpPost({ url: "/api/cabinet/homework/assignment", data });
};

export const getHomeworkAssignments: HandlerType<any, PaginationListModel<any>> = (params) => {
  return httpGet({ url: "/api/cabinet/homework/assignments", params });
};

export const addHomeworkExerciseAnswer: HandlerType<any, any> = (data) => {
  return httpPost({
    url: "/api/cabinet/homework/exercise-answer",
    data
  });
};

export const getExerciseAnswersByHomework: HandlerType<any, Array<ExerciseAnswerModel>> = ({ homeworkId, ...params }) => {
  return httpGet({
    url: `/api/cabinet/homework/exercise-answers/${homeworkId}`,
    params
  });
};

export const addHomeworkExercise: HandlerType<ExerciseCreateModel, number> = (data) => {
  return httpPost({ url: "/api/cabinet/homework/exercise", data });
};

export const updateHomeworkExercise: HandlerType<ExerciseUpdateModel, number> = ({ id, data }) => {
  return httpPut({ url: `/api/cabinet/homework/exercise/${id}`, data });
};

export const deleteHomeworkExercise: HandlerType<number, any> = (id) => {
  return httpDelete({ url: `/api/cabinet/homework/exercise/${id}` });
};