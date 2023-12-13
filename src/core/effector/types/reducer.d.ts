import { ResponseType } from "#types/apiResponseModels";

export interface ReducersCollectionType<R, S> {
  zeroReducer?: ReducerType;
  doneReducer?: DoneReducerType<R, S>;
  failReducer?: FailReducerType;
}

export type ReducerType = (state: any, params: any) => any;
export type DoneReducerType<R, S> = (state: S, response: ResponseType<R>) => S;
export type FailReducerType = <S>(state: any, error: any, initialState: any) => any;
export type GetReducerType = <S>(state: S) => DoneReducerType<any, S> | ReducerType;
