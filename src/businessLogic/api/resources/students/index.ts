import {
  StudentsListItemModel,
  StudentInviteModel
} from "#businessLogic/models/students";
import { HandlerType } from "#core/effector/types/handler";
import { httpDelete, httpGet, httpPatch, httpPost, httpPut } from "#core/httpClient";
import { PaginationListModel } from "#types/apiResponseModels";

export const getStudentsList: HandlerType<void, PaginationListModel<StudentsListItemModel>> = (
  params,
) => {
  return httpGet({ url: "/api/cabinet/students", params });
};

export const inviteStudent: HandlerType<StudentInviteModel, any> = (
  data,
) => {
  return httpPost({ url: "/api/cabinet/invitation", data });
};

export const deleteStudent: HandlerType<number, any> = (id) => {
  return httpDelete({ url: `/api/cabinet/students/${id}` });
};
