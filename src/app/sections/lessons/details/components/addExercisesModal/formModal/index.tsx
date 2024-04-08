import React, { FC, useEffect } from "react";

import { ModalControlType } from "#hooks/useModalControl";
import { TestTemplateForm } from "./testTemplateForm";
import { TextBlockTemplateForm } from "./textBlockForm";
import { BlankTemplateForm } from "./blankTemplateForm";
import { FillTextTemplateForm } from "./fillTextTemplateForm";
import { VideoTemplateForm } from "./videoTemplateForm";
import { ImagesTemplateForm } from "./imagesTemplateForm";

import { templateTypes } from "#constants/index";
import { ExerciseItemModel } from "#businessLogic/models/section";
import { useStore } from "effector-react";
import { $addExercise, $updateExercise } from "#stores/exercise";
import { notificationSuccess } from "#ui/notifications";

export type AddEditExercisesFormModalPropTypes = {
  editableData?: ExerciseItemModel;
  sectionId: number;
  template: string;
};

type TProps = {
  modalControl: ModalControlType<AddEditExercisesFormModalPropTypes>;
  closeModal?: () => void;
  callback: () => void;
};

export const AddEditExercisesFormModal: FC<TProps> = (props) => {
  const { modalControl, closeModal: closeMainModal, callback } = props;
  const { modalProps } = modalControl;
  const { editableData, sectionId, template } = modalProps;

  const addExerciseState = useStore($addExercise.store);
  const updateExerciseState = useStore($updateExercise.store);

  useEffect(() => {
    return () => {
      $addExercise.reset();
      $updateExercise.reset();
    };
  }, []);

  useEffect(() => {
    if (addExerciseState.data || updateExerciseState.data) {
      notificationSuccess("", addExerciseState.data ? "Упражнение добавлено" : "Упражнение обновлено");

      closeMainModal && closeMainModal();

      modalControl.closeModal();

      callback();
    }
  }, [addExerciseState.data, updateExerciseState.data]);

  return (
    <>
      {template === templateTypes.TEST && (
        <TestTemplateForm editableData={editableData} sectionId={sectionId} closeModal={modalControl.closeModal} />
      )}
      {template === templateTypes.TEXT_BLOCK && (
        <TextBlockTemplateForm editableData={editableData} sectionId={sectionId} closeModal={modalControl.closeModal} />
      )}
      {template === templateTypes.BLANK && (
        <BlankTemplateForm editableData={editableData} sectionId={sectionId} closeModal={modalControl.closeModal} />
      )}
      {template === templateTypes.FILL_TEXT && (
        <FillTextTemplateForm editableData={editableData} sectionId={sectionId} closeModal={modalControl.closeModal} />
      )}
      {template === templateTypes.VIDEO && (
        <VideoTemplateForm editableData={editableData} sectionId={sectionId} closeModal={modalControl.closeModal} />
      )}
      {template === templateTypes.IMAGES && (
        <ImagesTemplateForm editableData={editableData} sectionId={sectionId} closeModal={modalControl.closeModal} />
      )}
    </>
  );
};
