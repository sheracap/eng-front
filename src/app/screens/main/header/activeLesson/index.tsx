import React, { FC, useEffect } from "react";
import { useStore } from "effector-react";

import { $activeLesson, $deleteActiveLesson } from "#stores/activeLesson";
import { $currentUser } from "#stores/account";

import { useRole } from "#hooks/useRole";

import { ButtonUI } from "#ui/button";
import { useHistory } from "react-router-dom";


export const ActiveLesson: FC = () => {

  const history = useHistory();

  const currentUserState = useStore($currentUser.store);
  const activeLessonState = useStore($activeLesson.store);
  const deleteActiveLessonState = useStore($deleteActiveLesson.store);

  const { isTeacher, isStudent } = useRole();

  useEffect(() => {
    if (isTeacher) {
      $activeLesson.effect({});
    } else if (isStudent && currentUserState.data?.teacherId) {
      $activeLesson.effect({
        teacherId: currentUserState.data.teacherId
      });
    }
  }, []);

  useEffect(() => {
    if (deleteActiveLessonState.success) {
      $deleteActiveLesson.reset();
      $activeLesson.reset();
    }
  }, [deleteActiveLessonState.success]);

  const openLesson = () => {
    let courseId;
    let lessonId;

    if (activeLessonState.data) {
      courseId = activeLessonState.data.courseId;
      lessonId = activeLessonState.data.lessonId;
    }

    history.push(`/courses/${courseId}/lesson/${lessonId}/1`);
  }

  const finishLesson = () => {
    $deleteActiveLesson.effect();
  }

  return (
    <div className="active-lesson__actions">
      {activeLessonState.data && (
        <>
          <ButtonUI type="primary" onClick={openLesson}>
            Перейти к уроку
          </ButtonUI>
          {isTeacher && (
            <ButtonUI type="primary" danger onClick={finishLesson}>
              Завершить урок
            </ButtonUI>
          )}
        </>
      )}
    </div>
  )
}