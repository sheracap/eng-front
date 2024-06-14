import React, { FC, useEffect, useState } from "react";
import { $addHomeworkExerciseAnswer, $homeworkDetails } from "#stores/homework";
import { Spinner } from "#ui/spinner";
import { useStore } from "effector-react";
import styles from "#src/app/sections/courses/details/rightSide/styles.module.scss";
import { AddPlusSvgIcon, SwapIcon } from "#src/assets/svg";
import { useModalControl } from "#hooks/useModalControl";
import {
  AddExercisesModal,
  AddExercisesModalPropTypes
} from "#src/app/sections/lessons/details/components/addExercisesModal";
import { DrawerModalUI } from "#ui/drawerModal";

import { ButtonUI } from "#ui/button";
import { Switch } from "antd";

import { ModalUI } from "#ui/modal";
import {
  AssignHomeworkModal,
  AssignHomeworkModalPropTypes
} from "./assignHomeworkModal";
import { $homeWorkExerciseAnswers } from "#src/app/sections/lessons/details/effector";
import { Exercises } from "#components/exercises";
import { $exerciseAnswersByHomework } from "#stores/homework";
import { useRole } from "#hooks/useRole";


type PropsTypes = {
  homeworkId: number;
  isMine: boolean;
};

export const HomeworkDetails: FC<PropsTypes> = (props) => {
  const { homeworkId, isMine } = props;

  const homeworkDetailsState = useStore($homeworkDetails.store);
  const exerciseAnswersByHomeworkState = useStore($exerciseAnswersByHomework.store);

  const [showHints, setShowHints] = useState(isMine);

  const addExercisesModalControl = useModalControl<AddExercisesModalPropTypes>();
  const assignHomeworkModalControl = useModalControl<AssignHomeworkModalPropTypes>();

  const { isStudent } = useRole();

  useEffect(() => {
    return () => {
      $homeworkDetails.reset();
    }
  }, []);

  useEffect(() => {
    $homeworkDetails.effect(homeworkId);


    if (isStudent) {
      getExerciseAnswers();
    }
  }, [homeworkId]);

  const getExerciseAnswers = () => {
    const exerciseAnswers = $homeWorkExerciseAnswers.store.getState();

    if (homeworkId && !exerciseAnswers[homeworkId]) {
      $exerciseAnswersByHomework.effect(homeworkId);
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

  const onAssignHomework = () => {
    assignHomeworkModalControl.openModal({ homeworkId });
  }

  const onExerciseEdit = () => {

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
                //onClick={changePosition}
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
        <AddExercisesModal modalControl={addExercisesModalControl} callback={() => {}} />
      </DrawerModalUI>

      {/*<ModalUI*/}
      {/*  open={editExerciseModalControl.modalProps.open}*/}
      {/*  onCancel={editExerciseModalControl.closeModal}*/}
      {/*  width={600}*/}
      {/*>*/}
      {/*  <AddEditExercisesFormModal modalControl={editExerciseModalControl} callback={() => {}} />*/}
      {/*</ModalUI>*/}

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