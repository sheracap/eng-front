import React, { FC, useEffect, useState } from "react";
import { useStore } from "effector-react";
import { Switch, Popconfirm } from "antd";

import { $sectionDetails } from "#stores/section";
import { $deleteExercise, $exerciseAnswersBySection } from "#stores/exercise";
import { $exerciseAnswers, $lessonSections } from "../effector";

import { useModalControl } from "#hooks/useModalControl";
import { useRole } from "#hooks/useRole";

import { LessonDetailsModel } from "#businessLogic/models/lessons";

import {
  AddExercisesModal,
  AddExercisesModalPropTypes
} from "../components/addExercisesModal";

import { templateTypes } from "#constants/index";

import { TemplateTest } from "#components/templates/test";
import { TemplateTextBlock } from "#components/templates/textBlock";
import { TemplateBlank } from "#components/templates/blank";
import { TemplateFillText } from "#components/templates/fillText";
import { TemplateVideo } from "#components/templates/video";
import { TemplateImages } from "#components/templates/images";
import { TemplateFillImages } from "#components/templates/fillImages";

import { ModalUI } from "#ui/modal";
import { DrawerModalUI } from "#ui/drawerModal";
import { ButtonUI } from "#ui/button";
import { Spinner } from "#ui/spinner";
import { notificationSuccess } from "#ui/notifications";
import { ContextPopover } from "#ui/contextPopover";

import styles from "#src/app/sections/courses/details/rightSide/styles.module.scss";
import { AddPlusSvgIcon, DeleteIcon, EditSvgIcon, SwapIcon } from "#src/assets/svg";

import {
  ChangeExercisesPositionModal,
  ChangeExercisesPositionModalPropTypes
} from "../components/changeExercisesPositionModal";
import { AddSectionModal, AddSectionModalPropTypes } from "../components/addSectionModal";
import {
  AddEditExercisesFormModal,
  AddEditExercisesFormModalPropTypes
} from "../components/addExercisesModal/formModal";
import { $activeLesson } from "#stores/activeLesson";
import { $activeLessonByNotification } from "#src/app/screens/main/effector";

type PropsType = {
  isMine: boolean;
  lessonData: LessonDetailsModel;
  sectionId: number | undefined;
}

export const LessonSection: FC<PropsType> = (props) => {
  const { isMine, lessonData, sectionId } = props;

  const activeLessonState = useStore($activeLesson.store);
  const activeLessonByNotificationState = useStore($activeLessonByNotification.store);

  const { data: sectionData, loading: sectionLoading } = useStore($sectionDetails.store);
  const exerciseAnswersBySectionState = useStore($exerciseAnswersBySection.store);
  const lessonSectionsState: any = useStore($lessonSections.store);
  const deleteExerciseState = useStore($deleteExercise.store);

  const addSectionModalControl = useModalControl<AddSectionModalPropTypes>();
  const addExercisesModalControl = useModalControl<AddExercisesModalPropTypes>();
  const editExerciseModalControl = useModalControl<AddEditExercisesFormModalPropTypes>();
  const editExercisePositionModalControl = useModalControl<ChangeExercisesPositionModalPropTypes>();

  const [deletedExerciseIds, setDeletedExerciseIds] = useState<{ [key: string]: boolean }>({});
  const [showHints, setShowHints] = useState(isMine);

  const { isStudent } = useRole();

  useEffect(() => {
    if (activeLessonState.data || activeLessonByNotificationState) {
      setShowHints(false);
    }
  }, [activeLessonState.data || activeLessonByNotificationState])

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
  }, [sectionId, lessonSectionsState]);

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

  useEffect(() => {
    if (deleteExerciseState.data) {
      notificationSuccess("", "Упражнение удалено");

      setDeletedExerciseIds((prevState) => ({
        ...prevState,
        [deleteExerciseState.data.id]: true
      }));
    }
  }, [deleteExerciseState.data]);

  const changePosition = () => {
    if (sectionData) {
      editExercisePositionModalControl.openModal({
        sectionId: sectionData.id,
        lessonId: lessonData.id,
        editableExercises: sectionData.exercises
      })
    }
  }

  return (
    <div>
      {sectionLoading && (
        <div className="abs-loader">
          <Spinner />
        </div>
      )}
      {isMine && !sectionId && (
        <>
          <div className={styles.addSectionWrap} onClick={() => addSectionModalControl.openModal({ lessonId: lessonData.id })}>
            <div className={styles.addSectionIcon}><AddPlusSvgIcon /></div>
            <div className={styles.addSectionText}>Добавить раздел</div>
          </div>
          <ModalUI
            open={addSectionModalControl.modalProps.open}
            onCancel={addSectionModalControl.closeModal}
          >
            <AddSectionModal
              modalControl={addSectionModalControl}
              callback={(elem) => {
                $lessonSections.update([ ...lessonSectionsState, elem ]);
              }}
            />
          </ModalUI>
        </>
      )}

      {sectionData && sectionData.exercises.length > 0 && (
        <>
          {isMine && (
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
          {sectionData.exercises.map((item, index) => (
            <React.Fragment key={item.id}>
              {!deletedExerciseIds[item.id] && (
                <div className="exercise-item" key={item.id}>
                  <div className="exercise-item__title">
                    <div className="exercise-item__title__in">{index + 1}. {item.title}</div>
                    {isMine && (
                      <div className="exercise-item__title__actions">
                        <ContextPopover
                          content={(
                            <>
                              <div className="custom__popover__item">
                                <ButtonUI
                                  withIcon
                                  onClick={() => {
                                    editExerciseModalControl.openModal({
                                      editableData: item, sectionId: sectionData?.id, template: item.template
                                    });
                                  }}
                                >
                                  <EditSvgIcon /> Редактировать
                                </ButtonUI>
                              </div>
                              <div className="custom__popover__item">
                                <Popconfirm
                                  title="Вы уверены, что хотите удалить упражнение ?"
                                  onConfirm={() => $deleteExercise.effect(item.id)}
                                  okText="Да"
                                  cancelText="Нет"
                                >
                                  <ButtonUI
                                    danger
                                    withIcon
                                    loading={deleteExerciseState.loading}
                                  >
                                    <DeleteIcon /> Удалить
                                  </ButtonUI>
                                </Popconfirm>
                              </div>
                            </>
                          )}
                        />
                      </div>
                    )}
                  </div>
                  {item.template === templateTypes.TEST && (
                    <TemplateTest data={item} showHints={showHints} />
                  )}
                  {item.template === templateTypes.TEXT_BLOCK && (
                    <TemplateTextBlock data={item} />
                  )}
                  {item.template === templateTypes.BLANK && (
                    <TemplateBlank data={item} showHints={showHints} />
                  )}
                  {item.template === templateTypes.FILL_TEXT && (
                    <TemplateFillText data={item} showHints={showHints} />
                  )}
                  {item.template === templateTypes.VIDEO && (
                    <TemplateVideo data={item} />
                  )}
                  {item.template === templateTypes.IMAGES && (
                    <TemplateImages data={item} />
                  )}
                  {item.template === templateTypes.FILL_IMAGES && (
                    <TemplateFillImages data={item} />
                  )}
                </div>
              )}
            </React.Fragment>
          ))}
        </>
      )}

      {isMine && sectionData && (
        <>
          <div className={styles.addSectionWrap} onClick={() => addExercisesModalControl.openModal({ sectionId: sectionData.id })}>
            <div className={styles.addSectionIcon}><AddPlusSvgIcon /></div>
            <div className={styles.addSectionText}>Добавить упражнение</div>
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
            onClose={editExercisePositionModalControl.closeModal}
            width={600}
          >
            <ChangeExercisesPositionModal modalControl={editExercisePositionModalControl} callback={getSectionDetails} />
          </ModalUI>
        </>
      )}
    </div>
  )
};