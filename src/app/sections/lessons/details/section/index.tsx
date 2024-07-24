import React, { FC, useEffect, useState } from "react";
import { useStore } from "effector-react";
import { useHistory } from "react-router";
import { Switch } from "antd";

import { $activeLesson } from "#stores/activeLesson";
import { $sectionDetails } from "#stores/section";
import { $addExerciseAnswer, $deleteExercise, $exerciseAnswersBySection } from "#stores/exercise";
import { $exerciseAnswers } from "../effector";

import { useModalControl } from "#hooks/useModalControl";
import { useRole } from "#hooks/useRole";

import { LessonDetailsModel } from "#businessLogic/models/lessons";

import {
  AddExercisesModal,
  AddExercisesModalPropTypes
} from "../components/addExercisesModal";


import { ModalUI } from "#ui/modal";
import { DrawerModalUI } from "#ui/drawerModal";
import { ButtonUI } from "#ui/button";
import { Spinner } from "#ui/spinner";
import { BackBtn } from "#ui/backBtn";
import { notificationSuccess } from "#ui/notifications";

import { AddPlusSvgIcon, SwapIcon } from "#src/assets/svg";

import {
  ChangeExercisesPositionModal,
  ChangeExercisesPositionModalPropTypes
} from "../components/changeExercisesPositionModal";
import {
  AddSectionModal,
  AddSectionModalPropTypes
} from "../components/addSectionModal";
import {
  AddEditExercisesFormModal,
  AddEditExercisesFormModalPropTypes
} from "../components/addExercisesModal/formModal";

import { Exercises } from "#components/exercises";

import styles from "#src/app/sections/courses/details/rightSide/styles.module.scss";

type PropsType = {
  isMine: boolean;
  lessonData: LessonDetailsModel;
  sectionId: number | undefined;
  selectedStudentId: null | number;
  getStudentAnswers: (studentId: number, sectionId: number) => void;
}

export const LessonSection: FC<PropsType> = (props) => {
  const { isMine, lessonData, sectionId, selectedStudentId, getStudentAnswers } = props;

  const history = useHistory();

  const activeLessonState = useStore($activeLesson.store);

  const sectionDetailsState = useStore($sectionDetails.store);
  const exerciseAnswersBySectionState = useStore($exerciseAnswersBySection.store);
  const deleteExerciseState = useStore($deleteExercise.store);


  const addSectionModalControl = useModalControl<AddSectionModalPropTypes>();
  const addExercisesModalControl = useModalControl<AddExercisesModalPropTypes>();
  const editExerciseModalControl = useModalControl<AddEditExercisesFormModalPropTypes>();
  const editExercisePositionModalControl = useModalControl<ChangeExercisesPositionModalPropTypes>();

  const [showHints, setShowHints] = useState(isMine);

  const { isStudent } = useRole();

  const { data: sectionData, loading: sectionLoading } = sectionDetailsState;

  useEffect(() => {
    if (activeLessonState.data) {
      setShowHints(false);
    }
  }, [activeLessonState.data]);

  useEffect(() => {
    if (deleteExerciseState.data && sectionData) {
      notificationSuccess("", "Упражнение удалено");

      $sectionDetails.update({
        ...sectionDetailsState,
        data: {
          ...sectionData,
          exercises: sectionData.exercises.filter((item) => String(item.id) !== String(deleteExerciseState.data.id))
        }
      });
    }
  }, [deleteExerciseState.data]);

  const getSectionDetails = () => {
    if (sectionId) {
      $sectionDetails.effect(sectionId);
    }
  }

  const getExerciseAnswers = () => {
    const exerciseAnswers = $exerciseAnswers.store.getState();

    if (sectionId && !exerciseAnswers[sectionId]) {
      $exerciseAnswersBySection.effect(sectionId);
    }
  }

  useEffect(() => {
    return () => {
      $sectionDetails.reset();
    }
  }, []);

  useEffect(() => {
    getSectionDetails();

    if (isStudent) {
      getExerciseAnswers();
    }

    if (selectedStudentId && sectionId) {
      getStudentAnswers(selectedStudentId, sectionId);
    }

  }, [sectionId]);

  useEffect(() => {
    if (exerciseAnswersBySectionState.data && sectionId) {
      const answers = exerciseAnswersBySectionState.data.reduce((acc, item) => {
        return {
          ...acc,
          [item.exerciseId]: item.metaData
        }
      }, {});

      $exerciseAnswers.update({
        [sectionId]: answers,
      });
    }
  }, [exerciseAnswersBySectionState.data]);

  const changePosition = () => {
    if (sectionData) {
      editExercisePositionModalControl.openModal({
        entityId: sectionData.id,
        editableExercises: sectionData.exercises,
        isHomework: false
      })
    }
  }

  const onExerciseEdit = (item) => {
    if (sectionData) {
      editExerciseModalControl.openModal({
        editableData: item, entityId: sectionData.id, isHomework: false, template: item.template
      });
    }
  }

  const onExerciseDelete = (id) => {
    $deleteExercise.effect(id);
  }

  return (
    <div>
      {sectionLoading && (
        <div className="abs-loader">
          <Spinner />
        </div>
      )}

      <div className={styles.lessonNameWrap}>
        <div className={styles.lessonName}>
          <BackBtn onBackClick={() => history.goBack()} />
          <h1>{lessonData.name}</h1>
        </div>
        {isMine && (sectionData && sectionData.exercises.length > 0) && (
          <div className="exercise-hints-actions">
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
      </div>

      {isMine && !sectionId && (
        <>
          <ButtonUI
            type="primary"
            withIcon
            onClick={() => addSectionModalControl.openModal({ lessonId: lessonData.id })}
          >
            <AddPlusSvgIcon /> Добавить раздел
          </ButtonUI>
          <ModalUI
            open={addSectionModalControl.modalProps.open}
            onCancel={addSectionModalControl.closeModal}
          >
            <AddSectionModal
              modalControl={addSectionModalControl}
            />
          </ModalUI>
        </>
      )}

      {sectionData && sectionData.exercises.length > 0 && (
        <Exercises
          exercises={sectionData.exercises}
          onExerciseEdit={onExerciseEdit}
          isMine={isMine}
          showHints={showHints}
          entityId={sectionData.id}
          isHomework={false}
          deleteLoading={deleteExerciseState.loading}
          onDelete={onExerciseDelete}
          onCreateExerciseAnswerMain={(id, res, prevState) => {
            $addExerciseAnswer.effect({
              sectionId: sectionData.id,
              exerciseId: id,
              metaData: res
            }).then((response) => {
              if (response) {
                $exerciseAnswers.update({
                  [sectionData.id]: {
                    ...prevState,
                    [id]: res
                  }
                });
              }
            });
          }}
        />
      )}

      {isMine && sectionData && (
        <>
          <div className={styles.addSectionWrap}>
            <ButtonUI
              type="primary"
              withIcon
              onClick={() => addExercisesModalControl.openModal({ entityId: sectionData.id, isHomework: false })}
            >
              <AddPlusSvgIcon /> Добавить упражнение
            </ButtonUI>
          </div>
          <DrawerModalUI
            open={addExercisesModalControl.modalProps.open}
            onClose={addExercisesModalControl.closeModal}
          >
            <AddExercisesModal modalControl={addExercisesModalControl} callback={getSectionDetails} />
          </DrawerModalUI>

          <ModalUI
            open={editExerciseModalControl.modalProps.open}
            onCancel={editExerciseModalControl.closeModal}
            width={600}
          >
            <AddEditExercisesFormModal modalControl={editExerciseModalControl} callback={getSectionDetails} />
          </ModalUI>
          <ModalUI
            open={editExercisePositionModalControl.modalProps.open}
            onCancel={editExercisePositionModalControl.closeModal}
            width={600}
          >
            <ChangeExercisesPositionModal modalControl={editExercisePositionModalControl} callback={getSectionDetails} />
          </ModalUI>
        </>
      )}
    </div>
  )
};