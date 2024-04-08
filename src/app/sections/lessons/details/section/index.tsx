import React, { FC, useEffect, useState } from "react";
import { useStore } from "effector-react";
import { Switch } from "antd";

import { $sectionDetails } from "#stores/section";
import { useModalControl } from "#hooks/useModalControl";
import { AddSectionModal, AddSectionModalPropTypes } from "../components/addSectionModal";

import { LessonDetailsModel } from "#businessLogic/models/lessons";

import { $lessonSections } from "#src/app/sections/lessons/details/effector";
import {
  AddExercisesModal,
  AddExercisesModalPropTypes
} from "#src/app/sections/lessons/details/components/addExercisesModal";


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

import {
  AddEditExercisesFormModal,
  AddEditExercisesFormModalPropTypes
} from "#src/app/sections/lessons/details/components/addExercisesModal/formModal";

import styles from "#src/app/sections/courses/details/rightSide/styles.module.scss";
import { AddPlusSvgIcon, DeleteIcon, EditSvgIcon } from "#src/assets/svg";
import { Popconfirm, Radio, Space } from "antd";
import { $deleteExercise } from "#stores/exercise";
import { notificationSuccess } from "#ui/notifications";
import { ContextPopover } from "#ui/contextPopover";

type PropsType = {
  isMine: boolean;
  lessonData: LessonDetailsModel;
  sectionIndex: string;
}

export const LessonSection: FC<PropsType> = (props) => {
  const { isMine, lessonData, sectionIndex } = props;

  const { data: sectionData, loading: sectionLoading } = useStore($sectionDetails.store);
  const lessonSectionsState: any = useStore($lessonSections.store);
  const deleteExerciseState = useStore($deleteExercise.store);

  const addSectionModalControl = useModalControl<AddSectionModalPropTypes>();
  const addExercisesModalControl = useModalControl<AddExercisesModalPropTypes>();
  const editExerciseModalControl = useModalControl<AddEditExercisesFormModalPropTypes>();

  const [deletedExerciseIds, setDeletedExerciseIds] = useState<{ [key: string]: boolean }>({});
  const [showHints, setShowHints] = useState(isMine);

  const getSectionDetails = () => {
    const sectionId = lessonSectionsState[Number(sectionIndex) - 1]?.id;

    if (sectionId && sectionId !== sectionData?.id) {
      $sectionDetails.effect(sectionId);
    }
  }

  useEffect(() => {
    return () => {
      $sectionDetails.reset();
    }
  }, []);

  useEffect(() => {
    getSectionDetails();
  }, [sectionIndex, lessonSectionsState]);

  useEffect(() => {
    if (deleteExerciseState.data) {
      notificationSuccess("", "Упражнение удалено");

      setDeletedExerciseIds((prevState) => ({
        ...prevState,
        [deleteExerciseState.data.id]: true
      }));
    }
  }, [deleteExerciseState.data]);

  return (
    <div>
      {sectionLoading && (
        <div className="abs-loader">
          <Spinner />
        </div>
      )}
      {isMine && !sectionData && (
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
              Подсказки <Switch checked={showHints} onChange={(val) => setShowHints(val)} />
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
                                      editableData: item, sectionId: sectionData.id, template: item.template
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
                    <TemplateFillText data={item} />
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
        </>
      )}
    </div>
  )
};