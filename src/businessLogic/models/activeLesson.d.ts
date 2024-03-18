
export type ActiveLessonParamsType = {
  teacherId?: number;
}

export type ActiveLessonCreateModel = {
  courseId?: number;
  lessonId: number;
  studentsIds: Array<number>;
}