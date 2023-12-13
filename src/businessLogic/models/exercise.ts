export type ExerciseCreateModel = {
  sectionId: number;
  template: string;
  value: string;
  answer: string | null;
  wrongAnswers: Array<string> | null;
}