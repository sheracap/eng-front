import {
  StudentsListItemModel,
  StudentInviteModel,
} from "#businessLogic/models/students";
import { PaginationList } from "#constructors/data";
import { XHRDataState, XHRSuccessState } from "#constructors/store";
import { createXHRStore } from "#core/effector";
import { StoreType, StoreTypeWithData } from "#core/effector/types/store";
import { PaginationListModel } from "#types/apiResponseModels";
import { api } from "src/businessLogic/api";

export const $studentsList = createXHRStore<
  void,
  PaginationListModel<StudentsListItemModel>,
  StoreTypeWithData<PaginationListModel<StudentsListItemModel>>
>(api.students.getStudentsList, new XHRDataState(new PaginationList()));

export const $studentsForLessonList = createXHRStore<
  void,
  PaginationListModel<StudentsListItemModel>,
  StoreTypeWithData<PaginationListModel<StudentsListItemModel>>
>(api.students.getStudentsList, new XHRDataState(new PaginationList()));

export const $inviteStudent = createXHRStore<StudentInviteModel, any, StoreType>(
  api.students.inviteStudent,
  new XHRSuccessState(),
);

export const $deleteStudent = createXHRStore<number, any, StoreType>(
  api.students.deleteStudent,
  new XHRSuccessState(),
);
