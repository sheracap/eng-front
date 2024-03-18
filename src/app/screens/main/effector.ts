import { createGlobalStore } from "#core/effector";


export const $activeLessonByNotification = createGlobalStore<null | { lessonId: number, courseId?: number }>(null, true);

export const $selectedLesson = createGlobalStore<null | { lessonId: number; courseId?: number }>(null, true);

export const $selectedStudents = createGlobalStore<Array<number>>([], true);
