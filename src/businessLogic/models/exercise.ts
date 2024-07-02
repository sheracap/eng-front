export type ExerciseCreateModel = {
  title: string;
  sectionId?: number;
  homeworkId?: number;
  template: string;
  metaData: any;
};

export type ExerciseUpdateModel = {
  id: number;
  data: ExerciseCreateModel;
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