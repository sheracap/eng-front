import { createGlobalStore } from "#core/effector";
import { StudentsListItemModel } from "#businessLogic/models/students";

export const $selectedLesson = createGlobalStore<null | { lessonId: number; courseId?: number }>(null, true);

export const $selectedStudents = createGlobalStore<Array<StudentsListItemModel>>([], true);
