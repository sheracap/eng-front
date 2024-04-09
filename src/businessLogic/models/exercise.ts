export type ExerciseCreateModel = {
  title: string;
  sectionId: number;
  template: string;
  metaData: any;
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