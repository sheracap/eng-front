
import { PaginationList } from "#constructors/data";
import { XHRDataState, XHRSuccessState } from "#constructors/store";
import { createXHRStore } from "#core/effector";
import { StoreType, StoreTypeWithData } from "#core/effector/types/store";
import { PaginationListModel } from "#types/apiResponseModels";
import { api } from "src/businessLogic/api";
import { BooksListItemModel, BookDetailsModel } from "#businessLogic/models/books";

export const $booksList = createXHRStore<
  any,
  PaginationListModel<BooksListItemModel>,
  StoreTypeWithData<PaginationListModel<BooksListItemModel>>
>(api.books.getBooksList, new XHRDataState(new PaginationList()));

export const $addBook = createXHRStore<any, any, StoreTypeWithData<any>>(
  api.books.addBook,
  new XHRDataState(null),
);

export const $deleteBook = createXHRStore<number, any, StoreTypeWithData<any>>(
  api.books.deleteBook,
  new XHRDataState(null),
);

export const $updateBook = createXHRStore<any, any, StoreTypeWithData<any>>(
  api.books.updateBook,
  new XHRDataState(null),
);

export const $bookDetails = createXHRStore<
  number,
  BookDetailsModel,
  StoreTypeWithData<BookDetailsModel | null>
>(api.books.getBookDetails, new XHRDataState(null));
