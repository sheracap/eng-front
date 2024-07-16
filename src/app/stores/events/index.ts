import { XHRDataState, XHRSuccessState } from "#constructors/store";
import { createXHRStore } from "#core/effector";
import { StoreType, StoreTypeWithData } from "#core/effector/types/store";
import { api } from "src/businessLogic/api";

export const $eventsList = createXHRStore<
  any,
  Array<any>,
  StoreTypeWithData<{ [key: string]: Array<any> }>
>(
  api.events.getEventsList,
  new XHRDataState({}),
  {
    doneReducer: (state, response) => {
      const data = {};

      response.result.data.forEach((item) => {
        data[item.date] = [
          ...(data[item.date] ? data[item.date] : []),
          item
        ];
      });

      return {
        loading: false,
        data,
        error: null,
      }
    }
  }
);

export const $addEvent = createXHRStore<any, any, StoreTypeWithData<any>>(
  api.events.addEvent,
  new XHRDataState(null),
);

export const $deleteEvent = createXHRStore<number, any, StoreTypeWithData<any>>(
  api.events.deleteEvent,
  new XHRDataState(null),
);

export const $updateEvent = createXHRStore<any, any, StoreTypeWithData<any>>(
  api.events.updateEvent,
  new XHRDataState(null),
);
