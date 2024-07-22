export interface BooksListItemModel {
  id: number;
  title: string;
  img: string;
}

export interface BookDetailsModel extends BooksListItemModel {
  description: string;
  level: string;
}