export type ExerciseCreateModel = {
  title: string;
  sectionId?: number;
  homeworkId?: number;
  template: string;
  metaData: any;
  isHomework: boolean;
}

export type ExerciseUpdateModel = ExerciseCreateModel & {
  id: number;
}

export type ExerciseAnswerModel = {
  id: number;
  sectionId: number;
  exerciseId: number;
  metaData: any;
}

export type ExerciseAnswerCreateModel = {
  sectionId: number;
  exerciseId: number;
  metaData: any;
}