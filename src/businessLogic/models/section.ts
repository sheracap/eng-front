export interface ExerciseItemModel {
  id: number;
  title: string;
  sectionId: number;
  template: string;
  metaData: any;
  rowPosition: number;
}

export interface SectionDetailsModel {
  id: number;
  name: string;
  exercises: Array<ExerciseItemModel>;
}

export type SectionCreateModel = {
  lessonId: number;
  name: string;
}