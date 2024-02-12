import {
  ChapterCreateModel
} from "#businessLogic/models/chapter";
import { XHRDataState } from "#constructors/store";
import { createXHRStore } from "#core/effector";
import { StoreTypeWithData } from "#core/effector/types/store";
import { api } from "src/businessLogic/api";



export const $addChapter = createXHRStore<ChapterCreateModel, number, StoreTypeWithData<number | null>>(
  api.chapter.addChapter,
  new XHRDataState(null),
);
