import { HandlerType } from "#core/effector/types/handler";
import { httpDelete, httpGet, httpPatch, httpPost, httpPut } from "#core/httpClient";
import { PaginationListModel } from "#types/apiResponseModels";
import { BooksListItemModel, BookDetailsModel, BookPageDetailsModel } from "#businessLogic/models/books";

export const getBooksList: HandlerType<any, PaginationListModel<BooksListItemModel>> = (
  params,
) => {
  return httpGet({ url: "/api/cabinet/books", params });
};

export const getBookDetails: HandlerType<number, BookDetailsModel> = (id) => {
  return httpGet({ url: `/api/cabinet/books/${id}` });
};

export const getBookPageDetails: HandlerType<number, BookPageDetailsModel> = (id) => {
  return httpGet({ url: `/api/cabinet/books-pages/${id}` });
};

// ADMIN

export const addBook: HandlerType<any, any> = (data) => {
  return httpPost({ url: "/api/admin/books", data });
};

export const deleteBook: HandlerType<number, any> = (id) => {
  return httpDelete({ url: `/api/admin/books/${id}` });
};

export const updateBook: HandlerType<any, any> = ({ id, data }) => {
  return httpPut({ url: `/api/admin/books/${id}`, data });
};

export const addBookPage: HandlerType<any, any> = (data) => {
  return httpPost({ url: "/api/admin/books-pages", data });
};

export const updateBookPage: HandlerType<any, any> = (data) => {
  return httpPut({ url: `/api/admin/books-pages/${data.id}`, data });
};