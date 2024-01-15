import React, { FC } from "react";

import { ModalControlType } from "#hooks/useModalControl";
import { TestTemplateForm } from "./testTemplateForm";
import { TextBlockTemplateForm } from "./textBlockForm";
import { BlankTemplateForm } from "./blankTemplateForm";
import { FillTextTemplateForm } from "./fillTextTemplateForm";
import { VideoTemplateForm } from "./videoTemplateForm";
import { ImagesTemplateForm } from "./imagesTemplateForm";

import { templateTypes } from "#constants/index";
import { ExerciseItemModel } from "#businessLogic/models/section";

export type AddEditExercisesFormModalPropTypes = {
  editableData?: ExerciseItemModel;
  sectionId: number;
  template: string;
};

type TProps = {
  modalControl: ModalControlType<AddEditExercisesFormModalPropTypes>;
  closeModal?: () => void;
};

export const AddEditExercisesFormModal: FC<TProps> = (props) => {
  const { modalControl, closeModal } = props;
  const { modalProps } = modalControl;
  const { editableData, sectionId, template } = modalProps;

  return (
    <>
      {template === templateTypes.TEST && (
        <TestTemplateForm editableData={editableData} sectionId={sectionId} closeModal={modalControl.closeModal} closeMainModal={closeModal} />
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
