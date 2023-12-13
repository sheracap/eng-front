import React, { FC, useEffect, useState } from "react";
import { $lessonsByChapter } from "#stores/lessons";
import { useStore } from "effector-react";
import { ButtonUI } from "#ui/button";
import { useModalControl } from "#hooks/useModalControl";
import { ModalUI } from "#ui/modal";
import {
  AddLessonModal,
  AddLessonModalPropTypes
} from "#src/app/sections/courses/details/info/chapters/lessons/addLessonModal";
import { useHistory } from "react-router-dom";

type PropsTypes = {
  courseId: number;
  chapterId: number;
  lessonsCount: string;
  isLessonPage?: boolean;
  activeLessonId?: number;
}

export const ChapterLessons: FC<PropsTypes> = (props) => {
  const { courseId, chapterId, lessonsCount, isLessonPage, activeLessonId } = props;

  const history = useHistory();

  const lessonsByChapterState = useStore($lessonsByChapter.store);

  const [currentLessonsCount, setCurrentLessonsCount] = useState(Number(lessonsCount));

  const addLessonModalControl = useModalControl<AddLessonModalPropTypes>();

  useEffect(() => {
    if (currentLessonsCount && !lessonsByChapterState.data[chapterId]) {
      $lessonsByChapter.effect(chapterId);
    }
  }, [currentLessonsCount]);

  const onLessonClick = (lessonId: number) => {
    history.push(`/courses/${courseId}/lesson/${lessonId}/1`);
  };

  return (
    <div>
      {!isLessonPage && (
        <div className="flex-justify">
          <h2>Уроки</h2>
          <ButtonUI
            type="primary"
            size="small"
            onClick={() => addLessonModalControl.openModal({ chapterId })}
          >
            Добавить урок
          </ButtonUI>
          <ModalUI
            open={addLessonModalControl.modalProps.open}
            onCancel={addLessonModalControl.closeModal}
          >
            <AddLessonModal
              modalControl={addLessonModalControl}
              callback={() => setCurrentLessonsCount((prevVal) => prevVal + 1)}
            />
          </ModalUI>
        </div>
      )}
      <div className="chapter-lessons">
        {lessonsByChapterState.data[chapterId]?.map((item) => (
          <div
            className={`chapter-lessons__item ${activeLessonId === item.id ? "active": ""}`}
            key={item.id}
            onClick={() => onLessonClick(item.id)}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  )
};