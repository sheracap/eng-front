import { Store, createEffect, createEvent, createStore } from "effector";

import { FailReducerType, GetReducerType, ReducerType } from "./types/reducer";
import { CreateAdvancedFilterStorePropTypes, CreateXHRStoreType } from "./types/store";

const zeroReducerDefault: ReducerType = (state) => ({ ...state, loading: true });
const doneReducerDefault = (state, response) => {
  return {
    ...state,
    fulfilled: true,
    loading: false,
    data: response.result.data,
    error: undefined,
  };
};
const doneSuccessReducerDefault: ReducerType = (state) => ({
  ...state,
  fulfilled: true,
  loading: false,
  success: true,
  error: undefined,
});

const failReducerDefault: FailReducerType = (state, { error }, initialState) => ({
  ...state,
  fulfilled: true,
  loading: false,
  error: error.response && error.response.data,
  data: initialState.data,
});

const getDoneReducer: GetReducerType = (initialState) => {
  if (initialState && typeof initialState === "object" && "data" in initialState) {
    return doneReducerDefault;
  } else {
    return doneSuccessReducerDefault;
  }
};

export const createXHRStore: CreateXHRStoreType = (handler, initialState, reducers = {}, resets) => {
  const zeroReducer = reducers.zeroReducer !== undefined ? reducers.zeroReducer : zeroReducerDefault;
  const doneReducer =
    reducers.doneReducer !== undefined ? reducers.doneReducer : getDoneReducer<typeof initialState>(initialState);
  const failReducer = reducers.failReducer !== undefined ? reducers.failReducer : failReducerDefault;

  const effect = createEffect<typeof handler>({ handler });
  const reset = createEvent<void>();
  const store: Store<typeof initialState> = createStore(initialState).reset(reset);

  if (zeroReducer) {
    store.on<any>(effect, zeroReducer);
  }

  if (doneReducer) {
    store.on<any>(effect.done, doneReducer);
  }

  if (failReducer) {
    store.on<any>(effect.fail, (prevState, response) => failReducer(prevState, response, initialState));
  }

  if (resets) {
    if (Array.isArray(resets)) {
      resets.forEach((func) => {
        store.reset(func);
      });
    } else {
      store.reset(resets);
    }
  }

  return {
    effect,
    store,
    reset,
  };
};

export const createAdvancedFilterStore: CreateAdvancedFilterStorePropTypes = (initialState, resets) => {
  const handler = (prevStore: typeof initialState, props: typeof initialState) => ({
    params: {
      ...prevStore.params,
      ...props.params,
    },
    auxiliaries: {
      ...prevStore.auxiliaries,
      ...props.auxiliaries,
    },
  });

  const update = createEvent<typeof initialState>();
  const reset = createEvent<void>();
  const store: Store<typeof initialState> = createStore(initialState).on(update, handler).reset(reset);

  if (resets) {
    if (Array.isArray(resets)) {
      resets.forEach((func) => {
        store.reset(func);
      });
    } else {
      store.reset(resets);
    }
  }

  return {
    update,
    store,
    reset,
  };
};

export const createGlobalStore = (initialState, withoutSpread?) => {
  const handler = (prevStore, props) => {
    return withoutSpread ? props : { ...prevStore, ...props };
  };

  const update = createEvent();
  const reset = createEvent();
  const store = createStore(initialState).on(update, handler).reset(reset);

  return {
    update,
    store,
    reset,
  };
};

