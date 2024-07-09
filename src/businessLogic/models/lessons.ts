

export interface LessonItemModel {
  id: number;
  name: string;
  img: string;
  chapter: { id: number; name: string; }
}

export interface LessonDetailsModel {
  id: number;
  name: string;
  img: string;
  chapter: null | {
    id: number;
    name: string;
  };
  sections: Array<{
    id: number;
    name: string;
  }>;
  userId: number;
}

export type LessonsByChapterDataModel = {
  [key: string]: Array<LessonItemModel>;
}

export type LessonCreateModel = any | {
  chapterId?: number;
  name: string;
  img?: any;
}

export type LessonUpdateModel = {
  id: number;
  data: LessonCreateModel;
}

export type LessonsListItemModel = {
  id: number;
  img: null | string;
  name: string;
}