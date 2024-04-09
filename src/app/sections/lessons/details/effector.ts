import { createGlobalStore } from "#core/effector";


export const $lessonSections: any = createGlobalStore([], true);

export const $exerciseAnswers = createGlobalStore({});
