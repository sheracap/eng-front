import { LanguageLevel } from "#businessLogic/models/common";


export type TextForReadingParamsTypes = {
  level: LanguageLevel;
  page: number;
}

export type TextForReadingDetailsParamsTypes = {
  id: number;
  level: LanguageLevel;
}

export interface TextForReadingItemModel {
  id: number;
  title: string;
}

export interface TextForReadingDetailsModel extends TextForReadingItemModel {
  text: string;
}

