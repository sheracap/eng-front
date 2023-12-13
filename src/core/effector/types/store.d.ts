import { EffectByHandler, Event, Store } from "effector";

import { HandlerType } from "./handler";
import { ReducersCollectionType } from "./reducer";

export interface StoreTypeWithData<T> {
  fulfilled?: boolean;
  loading: boolean;
  data: T;
  error: any;
}

export interface StoreType {
  fulfilled?: boolean;
  loading: boolean;
  success: boolean;
  error: any;
}

export interface CreateStoreReturnType<P, S, R> {
  effect: EffectByHandler<HandlerType<P, R>, any>;
  store: Store<S>;
  reset: Event<void>;
}

export type CreateXHRStoreType = <P, R, S>(
  handler: HandlerType<P, R>,
  initialState: S,
  reducers?: ReducersCollectionType<R, S>,
  resets?: Array<any>,
) => CreateStoreReturnType<P, S, R>;

export interface AdvancedFilterStore<P, A> {
  params: P;
  auxiliaries: A;
}

export type CreateAdvancedFilterStorePropTypes = <P, A>(
  initialState: AdvancedFilterStore<P, A>,
  resets?: Array<any>,
) => {
  update: Event<AdvancedFilterStore<P, A>>;
  store: Store<AdvancedFilterStore<P, A>>;
  reset: Event<void>;
};
