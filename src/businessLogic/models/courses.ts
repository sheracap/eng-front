export interface CoursesListItemModel {
  id: number;
  name: string;
  img: string;
}

export interface CourseDetailsModel {
  id: number;
  name: string;
  img: string;
  description: string;
  isPrivate: boolean;
  userId: number;
}

export type CourseCreateModel = any | {
  img?: any;
  name: string;
  isPrivate: boolean;
}

export type CourseUpdateModel = {
  id: number;
  data: CourseCreateModel;
}

export interface CourseChapterItemModel {
  id: number;
  name: string;
  img: string | null;
  lessonsCount: string;
}