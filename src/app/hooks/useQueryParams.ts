import { useEffect, useState } from "react";

import { AdvancedFilterStore } from "#core/effector/types/store";
import { Event } from "effector";
import { History, Location } from "history";
import queryString from "query-string";
import { equals, isNil, mergeRight, pipe, reject } from "ramda";
import { useHistory, useLocation } from "react-router";

type AnyParamsType = { [key: string]: any };

const SEPARATE = "&separate=1&";

export const parseUrl = (url: string): any => queryString.parseUrl(url);
export const parseParams = (value: string, isAdditionalParams: boolean) => {
  const indx = isAdditionalParams ? 1 : 0;
  const data = value.split(SEPARATE)[indx];

  return queryString.parse(data);
};

export const updateQueryParams = pipe(
  (search: string, params: any) => mergeRight(queryString.parse(search), params),
  reject(isNil),
  queryString.stringify,
);

export const updatePathNew = (history: History, location: Location, qp: AnyParamsType, add: { [key: string]: any }) => {
  const requestParams = updateQueryParams("", qp);
  const additionalParams = updateQueryParams("", add);

  history.push(
    `${location.pathname}${requestParams ? "?" : ""}${requestParams}${
      additionalParams ? SEPARATE : ""
    }${additionalParams}`,
  );
};

const getInitParams = (initParams, searchParams) => {
  return { ...initParams, ...searchParams };
};

type useQueryParamsNewReturnType<T, A> = {
  queryParams: T;
  auxiliariesQueryParams: A;
  updateQueryParams: (params: T, auxiliaries?: A) => void;
  clearQueryParams: () => void;
};

type InitialValueType<T, A> = {
  queryParams: T;
  auxiliariesQueryParams: A;
};

type UpdateStoreType<T, A> = Event<AdvancedFilterStore<T, A>>;

export const useQueryParams = <T extends AnyParamsType, A extends AnyParamsType>(
  initialValue: InitialValueType<T, A>,
  updateStore?: UpdateStoreType<T, A>,
  resetStore?: Event<void>,
): useQueryParamsNewReturnType<T, A> => {
  const history = useHistory();
  const location = useLocation();

  const [queryParams, setQueryParams] = useState<T>(
    getInitParams(initialValue.queryParams, parseParams(location.search, false)),
  );
  const [auxiliariesQueryParams, setAuxiliariesQueryParams] = useState<A>(
    getInitParams(initialValue.auxiliariesQueryParams, parseParams(location.search, true)),
  );

  useEffect(() => {
    if (Object.keys(queryParams).length) {
      if (updateStore) {
        updateStore({
          params: queryParams,
          auxiliaries: auxiliariesQueryParams,
        });
      }
    }
  }, []);

  useEffect(() => {
    const locationParams = parseParams(location.search, false) as T;

    if (!equals(queryParams, locationParams)) {
      updatePathNew(history, location, { ...queryParams }, { ...auxiliariesQueryParams });
    }
  }, [queryParams]);

  const updateQueryParams = (newParams: T, auxiliaries?: A) => {
    setQueryParams((params) => ({ ...params, ...newParams }));
    setAuxiliariesQueryParams((params) => ({ ...params, ...auxiliaries }));

    if (updateStore) {
      updateStore({
        params: newParams,
        auxiliaries: auxiliaries ? auxiliaries : ({} as A),
      });
    }
  };

  const clearQueryParams = () => {
    setQueryParams({} as T);
    setAuxiliariesQueryParams({} as A);

    if (resetStore) {
      resetStore();
    }
  };

  return {
    queryParams,
    auxiliariesQueryParams,
    updateQueryParams,
    clearQueryParams,
  };
};
