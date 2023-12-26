import React, { FC } from "react";

import { ModalControlType } from "#hooks/useModalControl";
import { TestTemplateForm } from "./testTemplateForm";
import { TextBlockTemplateForm } from "./textBlockForm";
import { BlankTemplateForm } from "./blankTemplateForm";
import { FillTextTemplateForm } from "./fillTextTemplateForm";

import { templateTypes } from "#constants/index";

export type AddExercisesFormModalPropTypes = {
  sectionId: number;
  template: string;
};

type TProps = {
  modalControl: ModalControlType<AddExercisesFormModalPropTypes>;
  closeModal: () => void;
};

export const AddExercisesFormModal: FC<TProps> = (props) => {
  const { modalControl, closeModal } = props;
  const { modalProps } = modalControl;
  const { sectionId, template } = modalProps;

  return (
    <>
      {template === templateTypes.TEST && (
        <TestTemplateForm sectionId={sectionId} closeModal={modalControl.closeModal} closeMainModal={closeModal} />
      )}
      {template === templateTypes.TEXT_BLOCK && (
        <TextBlockTemplateForm sectionId={sectionId} closeModal={modalControl.closeModal} />
      )}
      {template === templateTypes.BLANK && (
        <BlankTemplateForm sectionId={sectionId} closeModal={modalControl.closeModal} />
      )}
      {template === templateTypes.FILL_TEXT && (
        <FillTextTemplateForm sectionId={sectionId} closeModal={modalControl.closeModal} />
      )}
    </>
  );
};
