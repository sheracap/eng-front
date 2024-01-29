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

export interface PaginationListModel<T> {
  rows: Array<T>;
  count: number;
}
