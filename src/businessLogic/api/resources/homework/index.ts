import { HandlerType } from "#core/effector/types/handler";
import { httpGet, httpPost } from "#core/httpClient";
import { PaginationListModel } from "#types/apiResponseModels";
import { ExerciseAnswerModel } from "#businessLogic/models/exercise";

export const getHomeworkDetails: HandlerType<any, any> = (id) => {
  return httpGet({ url: `/api/homework/details/${id}` });
};

export const addHomework: HandlerType<any, number> = (data) => {
  return httpPost({ url: "/api/homework", data });
};

export const getLessonHomeworks: HandlerType<number, number> = (lessonId) => {
  return httpGet({ url: `/api/homework/by-lesson/${lessonId}` });
};

export const assignHomework: HandlerType<any, any> = (data) => {
  return httpPost({ url: "/api/homework/assignment", data });
};

export const getHomeworkAssignments: HandlerType<any, PaginationListModel<any>> = (params) => {
  return httpGet({ url: "/api/homework/assignments", params });
};

export const addHomeworkExerciseAnswer: HandlerType<any, any> = (data) => {
  return httpPost({
    url: "/api/homework/exercise-answer",
    data
  });
};

export const getExerciseAnswersByHomework: HandlerType<number, Array<ExerciseAnswerModel>> = (homeworkId) => {
  return httpGet({
    url: `/api/homework/exercise-answers/${homeworkId}`,
  });
};