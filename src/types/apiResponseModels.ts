export type ErrorResponse = {
  detail: string;
  message: string;
  path: string;
  status: number;
  title: string;
};

export interface ResponseType<T = any> {
  result: {
    data: T;
    headers?: any;
  };
  params?: any;
}

export interface PaginationListOldModelOld<T> {
  content: Array<T>;
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    pageSize: number;
    pageNumber: number;
    offset: number;
    unpaged: boolean;
    paged: boolean;
  };
  totalPages: number;
  last: boolean;
  totalElements: number;
  first: boolean;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  numberOfElements: number;
  size: number;
  number: number;
  empty: boolean;
}

export interface PaginationListModel<T> {
  rows: Array<T>;
  count: number;
}
