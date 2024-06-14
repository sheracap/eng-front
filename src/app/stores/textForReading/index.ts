import { PaginationList } from "#constructors/data";
import { XHRDataState, XHRSuccessState } from "#constructors/store";
import { createXHRStore } from "#core/effector";
import { StoreType, StoreTypeWithData } from "#core/effector/types/store";
import { PaginationListModel } from "#types/apiResponseModels";
import { api } from "src/businessLogic/api";
import { TextForReadingItemModel, TextForReadingParamsTypes, TextForReadingDetailsModel, TextForReadingDetailsParamsTypes } from "#businessLogic/models/textForReading";

export const $textForReadingList = createXHRStore<
  TextForReadingParamsTypes,
  PaginationListModel<TextForReadingItemModel>,
  StoreTypeWithData<PaginationListModel<TextForReadingItemModel>>
>(api.textForReading.getTextForReadingList, new XHRDataState(new PaginationList()));

export const $textForReadingDetails = createXHRStore<
  TextForReadingDetailsParamsTypes,
  TextForReadingDetailsModel,
  StoreTypeWithData<{ [key: string]: TextForReadingDetailsModel }>
>(
  api.textForReading.getTextForReadingDetails,
  new XHRDataState({}),
  {
    doneReducer: (state, response) => {
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          [response.params.id]: response.result.data,
        },
        error: null,
      };
    }
  }
);

export const $createTextForReading = createXHRStore<any, any, StoreType>(
  api.textForReading.createTextForReading,
  new XHRSuccessState(),
);
