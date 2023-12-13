export interface ExerciseItemModel {
  answer: string;
  id: number;
  template: string;
  value: string;
  wrongAnswers: Array<string>;
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