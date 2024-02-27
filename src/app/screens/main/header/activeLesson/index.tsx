import React, { FC, useEffect } from "react";
import { useStore } from "effector-react";

import { $activeLesson } from "#stores/activeLesson";
import { $currentUser } from "#stores/account";
import { $activeLessonByNotification } from "#src/app/screens/main/effector";

import { useRole } from "#hooks/useRole";

import { ButtonUI } from "#ui/button";


export const ActiveLesson: FC = () => {

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

  return (
    <div>
      {(activeLessonState.data || activeLessonByNotificationState) && (
        <ButtonUI>Перейти к уроку</ButtonUI>
      )}
    </div>
  )
}