export type WordsParamsType = {
  page: number;
  wordCategoryId?: number;
}

export interface WordItemModel {
  id: number;
  value: string;
  wordCategoryId: number;
  translate: { [key: string]: any };
  transcription: null | string;
  img: null | string;
}

export type CreateWordModel = {
  value: string;
  transcription?: string;
  translate: { [key: string]: string },
  wordCategoryId?: number;
}


export interface WordCategoryItemModel {
  id: number;
  name: string;
  img: null | string;
  parentId: null | number;
}

export type CreateWordCategoryModel = {
  name: string;
}