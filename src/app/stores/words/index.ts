
import { PaginationList } from "#constructors/data";
import { XHRDataState, XHRSuccessState } from "#constructors/store";
import { createGlobalStore, createXHRStore } from "#core/effector";
import { StoreType, StoreTypeWithData } from "#core/effector/types/store";
import { PaginationListModel } from "#types/apiResponseModels";
import { api } from "src/businessLogic/api";
import {
  CreateWordCategoryModel,
  CreateWordModel,
  WordCategoryItemModel,
  WordItemModel,
  WordsParamsType
} from "#businessLogic/models/vocabulary";

export const $wordsList = createXHRStore<
  WordsParamsType,
  PaginationListModel<WordItemModel>,
  StoreTypeWithData<{ count: number; pages: { [key: string]: Array<WordItemModel> }  }>
>(
  api.words.getWordsList,
  new XHRDataState({ count: 0, pages: {} }),
  {
    doneReducer: (state, response) => {
      return {
        loading: false,
        data: {
          ...state.data,
          count: response.result.data.count,
          pages: {
            ...state.data.pages,
            [response.params.page]: response.result.data.rows,
          }
        },
        error: null,
      }
    }
  }
);

export const $createWord = createXHRStore<CreateWordModel, WordItemModel, StoreTypeWithData<null | WordItemModel>>(
  api.words.createWord,
  new XHRDataState(null),
);

export const $deleteWord = createXHRStore<number, any, StoreType>(
  api.words.deleteWord,
  new XHRSuccessState(),
);

export const $wordCategories = createXHRStore<
  void,
  Array<WordCategoryItemModel>,
  StoreTypeWithData<Array<WordCategoryItemModel>>
>(
  api.words.getWordCategories,
  new XHRDataState([]),
);

export const $createWordCategory = createXHRStore<CreateWordCategoryModel, WordCategoryItemModel, StoreTypeWithData<null | WordCategoryItemModel>>(
  api.words.createWordCategory,
  new XHRDataState(null),
);

export const $deleteWordCategory = createXHRStore<number, number, StoreTypeWithData<null | number>>(
  api.words.deleteWordCategory,
  new XHRDataState(null),
);

