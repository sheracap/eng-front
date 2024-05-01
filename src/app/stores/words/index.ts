
import { PaginationList } from "#constructors/data";
import { XHRDataState, XHRSuccessState } from "#constructors/store";
import { createGlobalStore, createXHRStore } from "#core/effector";
import { StoreType, StoreTypeWithData } from "#core/effector/types/store";
import { PaginationListModel } from "#types/apiResponseModels";
import { api } from "src/businessLogic/api";

export const $wordsList = createXHRStore<
  any,
  PaginationListModel<any>,
  StoreTypeWithData<PaginationListModel<any>>
>(api.words.getWordsList, new XHRDataState(new PaginationList()));

export const $newAddedWordsList = createGlobalStore<Array<any>>([], true);


