import { createGlobalStore } from "#core/effector";


export const $activeLessonByNotification = createGlobalStore<null | { lessonId: number }>(null, true);
