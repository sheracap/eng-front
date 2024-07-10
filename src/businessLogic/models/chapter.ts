

export type ChapterCreateModel = {
  courseId: number;
  name: string;
}

export type ChapterUpdateModel = ChapterCreateModel & {
  id: number;
}