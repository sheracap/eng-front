import React, { FC, useEffect, useState } from "react";
import { useStore } from "effector-react";
import { Switch } from "antd";

import {
  $addHomeworkExerciseAnswer,
  $homeworkDetails,
  $exerciseAnswersByHomework,
  $deleteHomeworkExercise
} from "#stores/homework";
import { $homeWorkExerciseAnswers } from "#src/app/sections/lessons/details/effector";

import { AddPlusSvgIcon, SwapIcon } from "#src/assets/svg";

import { useModalControl } from "#hooks/useModalControl";
import { useRole } from "#hooks/useRole";

import {
  AddExercisesModal,
  AddExercisesModalPropTypes
} from "#src/app/sections/lessons/details/components/addExercisesModal";
import {
  AddEditExercisesFormModal,
  AddEditExercisesFormModalPropTypes
} from "#src/app/sections/lessons/details/components/addExercisesModal/formModal";
import {
  ChangeExercisesPositionModal,
  ChangeExercisesPositionModalPropTypes
} from "#src/app/sections/lessons/details/components/changeExercisesPositionModal";

import { DrawerModalUI } from "#ui/drawerModal";
import { Spinner } from "#ui/spinner";
import { ButtonUI } from "#ui/button";
import { ModalUI } from "#ui/modal";
import { notificationSuccess } from "#ui/notifications";

import {
  AssignHomeworkModal,
  AssignHomeworkModalPropTypes
} from "./assignHomeworkModal";

import { Exercises } from "#components/exercises";

import styles from "#src/app/sections/courses/details/rightSide/styles.module.scss";


type PropsTypes = {
  homeworkId: number;
  isMine: boolean;
  studentId: number | undefined;
};

export const HomeworkDetails: FC<PropsTypes> = (props) => {
  const { homeworkId, isMine, studentId } = props;

  const homeworkDetailsState = useStore($homeworkDetails.store);
  const exerciseAnswersByHomeworkState = useStore($exerciseAnswersByHomework.store);
  const deleteHomeworkExerciseState = useStore($deleteHomeworkExercise.store);

  const [showHints, setShowHints] = useState(isMine);

  const addExercisesModalControl = useModalControl<AddExercisesModalPropTypes>();
  const editExerciseModalControl = useModalControl<AddEditExercisesFormModalPropTypes>();
  const editExercisePositionModalControl = useModalControl<ChangeExercisesPositionModalPropTypes>();
  const assignHomeworkModalControl = useModalControl<AssignHomeworkModalPropTypes>();

  const { isStudent } = useRole();

  useEffect(() => {
    return () => {
      $homeworkDetails.reset();
    }
  }, []);

  const getHomeworkDetails = () => {
    $homeworkDetails.effect(homeworkId);
  }

  useEffect(() => {
    getHomeworkDetails();


    if (isStudent) {
      getExerciseAnswers();
    }
  }, [homeworkId]);

  const getExerciseAnswers = () => {
    const exerciseAnswers = $homeWorkExerciseAnswers.store.getState();

    if (homeworkId && !exerciseAnswers[homeworkId]) {
      $exerciseAnswersByHomework.effect({
        homeworkId,
        studentId
      });
    }
  }

  useEffect(() => {
    if (exerciseAnswersByHomeworkState.data) {
      const answers = exerciseAnswersByHomeworkState.data.reduce((acc, item) => {
        return {
          ...acc,
          [item.homeworkExerciseId]: item.metaData
        }
      }, {});

      $homeWorkExerciseAnswers.update({
        [homeworkId]: answers,
      });
    }
  }, [exerciseAnswersByHomeworkState.data]);

  useEffect(() => {
    if (deleteHomeworkExerciseState.data && homeworkDetailsState.data) {
      notificationSuccess("", "Упражнение удалено");

      $homeworkDetails.update({
        ...homeworkDetailsState,
        data: {
          ...homeworkDetailsState.data,
          exercises: homeworkDetailsState.data.homeworkExercises.filter((item) => String(item.id) !== String(deleteHomeworkExerciseState.data.id))
        }
      });
    }
  }, [deleteHomeworkExerciseState.data]);

  const onAssignHomework = () => {
    assignHomeworkModalControl.openModal({ homeworkId });
  }

  const onExerciseEdit = (item) => {
    editExerciseModalControl.openModal({
      editableData: item,
      entityId: homeworkId,
      isHomework: true,
      template: item.template
    });
  }

  const onExerciseDelete = (id) => {
    $deleteHomeworkExercise.effect(id);
  }

  const changePosition = () => {
    editExercisePositionModalControl.openModal({
      entityId: homeworkId,
      editableExercises: homeworkDetailsState.data.homeworkExercises,
      isHomework: true
    });
  }

  return (
    <div>
      {homeworkDetailsState.loading && (
        <div className="abs-loader">
          <Spinner />
        </div>
      )}

      <h1>{homeworkDetailsState.data?.name}</h1>

      {homeworkDetailsState.data && homeworkDetailsState.data.homeworkExercises.length > 0 && (
        <>
          {isMine && (
            <div className="exercise-hints-actions">
              <ButtonUI
                type="primary"
                withIcon
                size="small"
                onClick={onAssignHomework}
              >
                Выставить домашнее задание
              </ButtonUI>
              <ButtonUI
                type="primary"
                withIcon
                size="small"
                onClick={changePosition}
              >
                <SwapIcon /> Поменять порядок
              </ButtonUI>
              <div>
                Подсказки <Switch checked={showHints} onChange={(val) => setShowHints(val)} />
              </div>
            </div>
          )}

          <Exercises
            exercises={homeworkDetailsState.data.homeworkExercises}
            onExerciseEdit={onExerciseEdit}
            isMine={isMine}
            showHints={showHints}
            entityId={homeworkId}
            isHomework={true}
            onDelete={onExerciseDelete}
            deleteLoading={false}
            onCreateExerciseAnswerMain={(id, res, prevState) => {
              $addHomeworkExerciseAnswer.effect({
                homeworkId,
                homeworkExerciseId: id,
                metaData: res
              }).then((response) => {
                if (response) {
                  $homeWorkExerciseAnswers.update({
                    [homeworkId]: {
                      ...prevState,
                      [id]: res
                    }
                  });
                }
              });
            }}
          />
        </>
      )}

      {isMine && (
        <div className={styles.addSectionWrap} onClick={() => addExercisesModalControl.openModal({ entityId: homeworkId, isHomework: true })}>
          <div className={styles.addSectionIcon}><AddPlusSvgIcon /></div>
          <div className={styles.addSectionText}>Добавить упражнение</div>
        </div>
      )}

      <DrawerModalUI
        open={addExercisesModalControl.modalProps.open}
        onClose={addExercisesModalControl.closeModal}
      >
        <AddExercisesModal modalControl={addExercisesModalControl} callback={getHomeworkDetails} />
      </DrawerModalUI>

      <ModalUI
        open={editExerciseModalControl.modalProps.open}
        onCancel={editExerciseModalControl.closeModal}
        width={600}
      >
        <AddEditExercisesFormModal modalControl={editExerciseModalControl} callback={getHomeworkDetails} />
      </ModalUI>

      <ModalUI
        open={editExercisePositionModalControl.modalProps.open}
        onCancel={editExercisePositionModalControl.closeModal}
        width={600}
      >
        <ChangeExercisesPositionModal modalControl={editExercisePositionModalControl} callback={getHomeworkDetails} />
      </ModalUI>

      <ModalUI
        open={assignHomeworkModalControl.modalProps.open}
        onCancel={assignHomeworkModalControl.closeModal}
        width={600}
      >
        <AssignHomeworkModal modalControl={assignHomeworkModalControl} />
      </ModalUI>
    </div>
  )
}