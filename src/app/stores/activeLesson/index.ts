import {
  ActiveLessonCreateModel, ActiveLessonParamsType
} from "#businessLogic/models/activeLesson";
import { XHRDataState, XHRSuccessState } from "#constructors/store";
import { createXHRStore } from "#core/effector";
import { StoreTypeWithData, StoreType } from "#core/effector/types/store";
import { api } from "src/businessLogic/api";


export const $createActiveLesson = createXHRStore<ActiveLessonCreateModel, any, StoreType>(
  api.activeLesson.createActiveLesson,
  new XHRSuccessState(),
);

export const $activeLesson = createXHRStore<ActiveLessonParamsType, any, StoreTypeWithData<any>>(
  api.activeLesson.getActiveLesson,
  new XHRDataState(null),
);

export const $deleteActiveLesson = createXHRStore<number, any, StoreType>(
  api.activeLesson.deleteActiveLesson,
  new XHRSuccessState(),
);