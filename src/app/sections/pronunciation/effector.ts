import { createGlobalStore } from "#core/effector";

export const $myTextForReading = createGlobalStore("", true);
export const $selectedTextIdForReading = createGlobalStore<null | number>(null, true);