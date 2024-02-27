import React, { FC } from "react";
import { ButtonUI } from "#ui/button";
import { useStore } from "effector-react";
import { $activeLesson } from "#stores/activeLesson";
import { $activeLessonByNotification } from "#src/app/screens/main/effector";
import { ModalUI } from "#ui/modal";
import { useModalControl } from "#hooks/useModalControl";
import { StartLessonModal } from "./modal";

export const StartLesson: FC = () => {
  const activeLessonState = useStore($activeLesson.store);
  const activeLessonByNotificationState = useStore($activeLessonByNotification.store);

  const startLessonModalControl = useModalControl();

  return (
    <>
      {!(activeLessonState.data || activeLessonByNotificationState) && (
        <ButtonUI
          type="primary"
          onClick={() => startLessonModalControl.openModal()}
        >
          Начать урок
        </ButtonUI>
      )}
      <ModalUI
        className="start-lesson-modal"
        open={startLessonModalControl.modalProps.open}
        onCancel={startLessonModalControl.closeModal}
        width={"100%"}
      >
        <StartLessonModal modalControl={startLessonModalControl} />
      </ModalUI>
    </>
  )
}