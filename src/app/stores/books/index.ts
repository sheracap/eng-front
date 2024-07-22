
import { PaginationList } from "#constructors/data";
import { XHRDataState, XHRSuccessState } from "#constructors/store";
import { createXHRStore } from "#core/effector";
import { StoreType, StoreTypeWithData } from "#core/effector/types/store";
import { PaginationListModel } from "#types/apiResponseModels";
import { api } from "src/businessLogic/api";
import { BooksListItemModel, BookDetailsModel, BookPageDetailsModel } from "#businessLogic/models/books";

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

// pages

export const $addBookPage = createXHRStore<any, any, StoreTypeWithData<any>>(
  api.books.addBookPage,
  new XHRDataState(null),
);

export const $updateBookPage = createXHRStore<any, any, StoreTypeWithData<any>>(
  api.books.updateBookPage,
  new XHRDataState(null),
);

export const $bookPageDetails = createXHRStore<
  number,
  BookPageDetailsModel,
  StoreTypeWithData<{ [key: string]: BookPageDetailsModel }>
>(
  api.books.getBookPageDetails,
  new XHRDataState({}),
  {
    doneReducer: (state, response) => {
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          [response.params]: response.result.data,
        },
        error: null,
      };
    },
  }
);
