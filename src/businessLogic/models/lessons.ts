

export interface LessonItemModel {
  id: number;
  name: string;
  img: string;
}

export interface LessonDetailsModel {
  id: number;
  name: string;
  img: string;
  chapter: null | {
    id: number;
    name: string;
    course: {
      id: number;
      name: string;
    }
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