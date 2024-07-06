import {
  SectionDetailsModel,
  SectionCreateModel, SectionUpdateModel
} from "#businessLogic/models/section";
import { XHRDataState, XHRSuccessState } from "#constructors/store";
import { createXHRStore } from "#core/effector";
import { StoreType, StoreTypeWithData } from "#core/effector/types/store";
import { api } from "src/businessLogic/api";

export const $sectionDetails = createXHRStore<
  number,
  SectionDetailsModel,
  StoreTypeWithData<SectionDetailsModel | null>
>(api.section.courseDetails, new XHRDataState(null));

export const $addSection = createXHRStore<SectionCreateModel, number, StoreTypeWithData<number | null>>(
  api.section.addSection,
  new XHRDataState(null),
);

export const $updateSection = createXHRStore<SectionUpdateModel, number, StoreTypeWithData<number | null>>(
  api.section.updateSection,
  new XHRDataState(null),
);

export const $changeExercisesPosition = createXHRStore<any, number, StoreType>(
  api.exercise.changeExercisesPosition,
  new XHRSuccessState(),
);

export const $deleteSection = createXHRStore<number, number, StoreTypeWithData<number | null>>(
  api.section.deleteSection,
  new XHRDataState(null),
);
