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
import { AddPlusSvgIcon } from "#src/assets/svg";

type PropsTypes = {
  courseId: number;
  chapterId: number;
  isLessonPage?: boolean;
  activeLessonId?: number;
  isPrivate: boolean;
}

export const ChapterLessons: FC<PropsTypes> = (props) => {
  const { courseId, chapterId, isLessonPage, activeLessonId, isPrivate } = props;

  const history = useHistory();

  const lessonsByChapterState = useStore($lessonsByChapter.store);
  const [newLessons, setNewLessons] = useState<Array<{ id: number; name: string; }>>([]);

  const addLessonModalControl = useModalControl<AddLessonModalPropTypes>();

  useEffect(() => {
    if (!lessonsByChapterState.data[chapterId]) {
      $lessonsByChapter.effect(chapterId);
    }
  }, []);

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
            withIcon
            size="small"
            onClick={() => addLessonModalControl.openModal({ chapterId, isPrivate })}
          >
            <AddPlusSvgIcon /> Добавить урок
          </ButtonUI>
          <ModalUI
            open={addLessonModalControl.modalProps.open}
            onCancel={addLessonModalControl.closeModal}
          >
            <AddLessonModal
              modalControl={addLessonModalControl}
              callback={(id, name) => {
                setNewLessons((prevState) => [...prevState, { id, name }]);
              }}
            />
          </ModalUI>
        </div>
      )}
      <div className="chapter-lessons">
        {lessonsByChapterState.data[chapterId] && (
          <>
            {[...lessonsByChapterState.data[chapterId], ...newLessons].map((item) => (
              <div
                className={`chapter-lessons__item ${activeLessonId === item.id ? "active": ""}`}
                key={item.id}
                onClick={() => onLessonClick(item.id)}
              >
                {item.name}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
};