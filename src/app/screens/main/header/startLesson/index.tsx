import React, { FC } from "react";
import { ButtonUI } from "#ui/button";
import { useStore } from "effector-react";
import { $activeLesson } from "#stores/activeLesson";
import { ModalUI } from "#ui/modal";
import { useModalControl } from "#hooks/useModalControl";
import { StartLessonModal } from "./modal";

export const StartLesson: FC = () => {
  const activeLessonState = useStore($activeLesson.store);

  const startLessonModalControl = useModalControl();

  return (
    <>
      {!activeLessonState.data && (
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
        width={1400}
      >
        <StartLessonModal modalControl={startLessonModalControl} />
      </ModalUI>
    </>
  )
}