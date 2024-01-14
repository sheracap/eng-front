export type ExerciseCreateModel = {
  title: string;
  sectionId: number;
  template: string;
  metaData: any;
}

export type ExerciseUpdateModel = ExerciseCreateModel & {
  id: number;
}