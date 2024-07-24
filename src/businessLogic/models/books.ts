export interface BooksListItemModel {
  id: number;
  title: string;
  img: string;
}

export interface BookDetailsModel extends BooksListItemModel {
  description: string;
  language: string;
  level: string;
  bookPages: Array<{ id: number; title: null | string; }>;
}

export interface BookPageDetailsModel {
  id: number;
  title: string | null;
  text: string;
  bookId: number;
}