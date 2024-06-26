import { HandlerType } from "#core/effector/types/handler";
import { httpGet, httpPost, httpPut } from "#core/httpClient";
import { PaginationListModel } from "#types/apiResponseModels";
import { ExerciseAnswerModel, ExerciseCreateModel, ExerciseUpdateModel } from "#businessLogic/models/exercise";

export const getHomeworkDetails: HandlerType<any, any> = (id) => {
  return httpGet({ url: `/api/cabinet/homework/details/${id}` });
};

export const addHomework: HandlerType<any, number> = (data) => {
  return httpPost({ url: "/api/cabinet/homework", data });
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

export const getExerciseAnswersByHomework: HandlerType<number, Array<ExerciseAnswerModel>> = (homeworkId) => {
  return httpGet({
    url: `/api/cabinet/homework/exercise-answers/${homeworkId}`,
  });
};

export const addHomeworkExercise: HandlerType<ExerciseCreateModel, number> = (data) => {
  return httpPost({ url: "/api/cabinet/homework/exercise", data });
};

export const updateHomeworkExercise: HandlerType<ExerciseUpdateModel, number> = ({ id, data }) => {
  return httpPut({ url: `/api/cabinet/homework/exercise/${id}`, data });
};