import React, { FC } from "react";

import { ModalControlType } from "#hooks/useModalControl";
import {
  TestTemplateForm
} from "./testTemplateForm";
import {
  TextBlockTemplateForm
} from "./textBlockForm";

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
      {template === "TEST" && (
        <TestTemplateForm sectionId={sectionId} closeModal={closeModal} />
      )}
      {template === "TEXT_BLOCK" && (
        <TextBlockTemplateForm sectionId={sectionId} closeModal={closeModal} />
      )}
    </>
  );
};
