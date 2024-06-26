import React, { FC, useEffect, useMemo, useState } from "react";
import { Steps, Tabs } from "antd";

import { ModalControlType } from "#hooks/useModalControl";
import { $addChapter } from "#stores/chapter";
import { ButtonUI } from "#ui/button";
import { ModalUI } from "#ui/modal";

import { StartLessonCoursesTab } from "./courses";

import "./styles.scss";
import { StartLessonStudentsTab } from "#src/app/screens/main/header/startLesson/modal/students";
import { useStore } from "effector-react";
import { $selectedLesson, $selectedStudents } from "#src/app/screens/main/effector";
import { notificationWarning } from "#ui/notifications";
import { $activeLesson, $createActiveLesson } from "#stores/activeLesson";
import { useHistory } from "react-router-dom";

const { Step } = Steps;

type PropTypes = {
  modalControl: ModalControlType;
};

export const StartLessonModal: FC<PropTypes> = (props) => {
  const { modalControl } = props;

  const history = useHistory();

  const { closeModal } = modalControl;

  const createActiveLessonState = useStore($createActiveLesson.store);
  const selectedLessonState = useStore($selectedLesson.store);
  const selectedStudentsState = useStore($selectedStudents.store);

  const [step, setStep] = useState(0);

  useEffect(() => {
    return () => {
      $addChapter.reset();
      $createActiveLesson.reset();
      $selectedLesson.reset();
      $selectedStudents.reset();
    };
  }, []);

  useEffect(() => {
    if (createActiveLessonState.success) {
      if (selectedLessonState && selectedLessonState.courseId) {
        $activeLesson.update({
          loading: false,
          data: {
            lessonId: selectedLessonState.lessonId,
            courseId: selectedLessonState.courseId,
            students: JSON.stringify(selectedStudentsState)
          },
          error: null
        });

        history.push(`/courses/${selectedLessonState.courseId}/lesson/${selectedLessonState.lessonId}/1`);
      }

      closeModal();
    }
  }, [createActiveLessonState.success]);

  const items = useMemo(() => {
    return [
      { label: "Курсы", key: "courses", children: <StartLessonCoursesTab /> },
      { label: "Уроки", key: "lessons", children: <div>12</div> },
    ]
  }, []);

  const onCancelClick = () => {
    if (step === 0) {
      closeModal();
    } else {
      setStep(0);
    }
  };

  const onContinueClick = () => {
    if (step === 0) {
      if (!selectedLessonState) {
        notificationWarning("Выберите урок", "");
      } else {
        setStep(1);
      }
    } else {
      if (!selectedStudentsState.length || !selectedLessonState) {
        notificationWarning("Выберите учеников", "");
      } else {
        $createActiveLesson.effect({
          courseId: selectedLessonState.courseId,
          lessonId: selectedLessonState.lessonId,
          studentsIds: selectedStudentsState.map((item) => item.id)
        });
      }
    }
  }

  return (
    <>
      <ModalUI.Loading show={createActiveLessonState.loading} />
      <ModalUI.Header>
        <ModalUI.Title>Начать урок</ModalUI.Title>
        <div className="start-lesson-modal__steps-wr">
          <Steps current={step}>
            <Step title="Выберите урок" />
            <Step title="Выберите учеников" />
          </Steps>
        </div>
      </ModalUI.Header>
      <ModalUI.Middle>
        {step === 0 && (
          <Tabs items={items} />
        )}
        {step === 1 && (
          <StartLessonStudentsTab />
        )}
      </ModalUI.Middle>
      <ModalUI.Footer>
        <ModalUI.Buttons>
          <ModalUI.Buttons.Col>
            <ButtonUI type="secondary" onClick={onCancelClick}>
              {step === 0 ? "Отмена" : "Назад"}
            </ButtonUI>
          </ModalUI.Buttons.Col>
          <ModalUI.Buttons.Col>
            <ButtonUI type="primary" onClick={onContinueClick}>
              {step === 0 ? "Продолжить" : "Начать урок"}
            </ButtonUI>
          </ModalUI.Buttons.Col>
        </ModalUI.Buttons>
      </ModalUI.Footer>
    </>
  );
};
