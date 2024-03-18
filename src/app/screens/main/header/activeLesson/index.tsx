import React, { FC, useEffect } from "react";
import { useStore } from "effector-react";

import { $activeLesson } from "#stores/activeLesson";
import { $currentUser } from "#stores/account";
import { $activeLessonByNotification } from "#src/app/screens/main/effector";

import { useRole } from "#hooks/useRole";

import { ButtonUI } from "#ui/button";
import { useHistory } from "react-router-dom";


export const ActiveLesson: FC = () => {

  const history = useHistory();

  const currentUserState = useStore($currentUser.store);
  const activeLessonState = useStore($activeLesson.store);
  const activeLessonByNotificationState = useStore($activeLessonByNotification.store);

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

  const openLesson = () => {
    let courseId;
    let lessonId;

    if (activeLessonByNotificationState) {
      if (activeLessonByNotificationState.courseId) {
        courseId = activeLessonByNotificationState.courseId;
        lessonId = activeLessonByNotificationState.lessonId;
      }
    } else if (activeLessonState.data) {
      courseId = activeLessonState.data.courseId;
      lessonId = activeLessonState.data.lessonId;
    }

    history.push(`/courses/${courseId}/lesson/${lessonId}/1`);
  }

  return (
    <div>
      {(activeLessonState.data || activeLessonByNotificationState) && (
        <ButtonUI type="primary" onClick={openLesson}>
          Перейти к уроку
        </ButtonUI>
      )}
    </div>
  )
}