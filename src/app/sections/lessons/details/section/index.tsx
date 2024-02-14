import React, { FC, useEffect } from "react";
import { useStore } from "effector-react";

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
import { AddPlusSvgIcon, EditSvgIcon } from "#src/assets/svg";

type PropsType = {
  isMine: boolean;
  lessonData: LessonDetailsModel;
  sectionIndex: string;
}

export const LessonSection: FC<PropsType> = (props) => {
  const { isMine, lessonData, sectionIndex } = props;

  const { data: sectionData, loading: sectionLoading } = useStore($sectionDetails.store);
  const lessonSectionsState: any = useStore($lessonSections.store);

  const addSectionModalControl = useModalControl<AddSectionModalPropTypes>();
  const addExercisesModalControl = useModalControl<AddExercisesModalPropTypes>();
  const editExerciseModalControl = useModalControl<AddEditExercisesFormModalPropTypes>();

  useEffect(() => {
    return () => {
      $sectionDetails.reset();
    }
  }, []);

  useEffect(() => {
    const sectionId = lessonSectionsState[Number(sectionIndex) - 1]?.id;

    if (sectionId && sectionId !== sectionData?.id) {
      $sectionDetails.effect(sectionId);
    }
  }, [sectionIndex, lessonSectionsState]);

  console.log("isMine", isMine);

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


      {sectionData?.exercises.map((item, index) => (
        <div className="exercise-item" key={item.id}>
          <div className="exercise-item__title">
            <div className="exercise-item__title__in">{index + 1}. {item.title}</div>
            {isMine && (
              <div className="exercise-item__title__actions">
                <ButtonUI
                  type="primary"
                  withIcon
                  onClick={() => {
                    editExerciseModalControl.openModal({
                      editableData: item, sectionId: sectionData.id, template: item.template
                    });
                  }}
                >
                  <EditSvgIcon />
                </ButtonUI>
              </div>
            )}
          </div>
          {item.template === templateTypes.TEST && (
            <TemplateTest data={item} />
          )}
          {item.template === templateTypes.TEXT_BLOCK && (
            <TemplateTextBlock data={item} />
          )}
          {item.template === templateTypes.BLANK && (
            <TemplateBlank data={item} />
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
      ))}

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
            <AddExercisesModal modalControl={addExercisesModalControl} />
          </DrawerModalUI>

          <ModalUI
            open={editExerciseModalControl.modalProps.open}
            onCancel={editExerciseModalControl.closeModal}
            width={600}
          >
            <AddEditExercisesFormModal modalControl={editExerciseModalControl} />
          </ModalUI>
        </>
      )}
    </div>
  )
};