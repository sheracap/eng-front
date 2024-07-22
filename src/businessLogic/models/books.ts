export interface BooksListItemModel {
  id: number;
  title: string;
  img: string;
}

export interface BookDetailsModel extends BooksListItemModel {
  description: string;
  language: string;
  level: string;
  bookPages: Array<any>;
}

export interface BookPageDetailsModel {
  id: number;
  title: string | null;
  text: string;
  bookId: number;
}