import {
  SectionDetailsModel,
  SectionCreateModel
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
