
export type ActiveLessonParamsType = {
  teacherId?: number;
}

export type ActiveLessonCreateModel = {
  lessonId: number;
  studentsIds: Array<number>;
}