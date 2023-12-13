import React, { FC, useEffect, useMemo, useState } from "react";
import { message } from "antd";

import { ModalControlType, useModalControl } from "#hooks/useModalControl";
import { ButtonUI } from "#ui/button";
import { ModalUI } from "#ui/modal";


import styles from "./styles.module.scss";
import { DrawerModalUI } from "#ui/drawerModal";
import {
  AddExercisesFormModal,
  AddExercisesFormModalPropTypes
} from "./formModal";

export type AddExercisesModalPropTypes = {
  sectionId: number;
};

type TProps = {
  modalControl: ModalControlType<AddExercisesModalPropTypes>;
};

export const AddExercisesModal: FC<TProps> = (props) => {
  const { modalControl } = props;
  const { closeModal, modalProps } = modalControl;
  const { sectionId } = modalProps;

  const addExercisesFormModalControl = useModalControl<AddExercisesFormModalPropTypes>();

  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const onSelectTemplate = (val: string) => {
    setSelectedTemplate(val);
  };

  const onSubmitClick = () => {
    if (!selectedTemplate) {
      message.warning("Выберите шаблон");
      return;
    } else {
      addExercisesFormModalControl.openModal({ sectionId, template: selectedTemplate });
    }
  };

  return (
    <>
      <ModalUI.Header>
        <ModalUI.Title>Выберите шаблон упражнения</ModalUI.Title>
      </ModalUI.Header>
      <ModalUI.Middle>
        <div className={styles.templatesList}>
          <div className={`${styles.templateItem} ${selectedTemplate === "TEST" ? "active" : ""}`} onClick={() => onSelectTemplate("TEST")}>
            Тест
          </div>
          <div className={`${styles.templateItem} ${selectedTemplate === "TEXT_BLOCK" ? "active" : ""}`} onClick={() => onSelectTemplate("TEXT_BLOCK")}>
            Текстовый блок
          </div>
        </div>
      </ModalUI.Middle>
      <ModalUI.Footer>
        <ModalUI.Buttons>
          <ModalUI.Buttons.Col>
            <ButtonUI onClick={() => modalControl.closeModal()} fullWidth>
              Отмена
            </ButtonUI>
          </ModalUI.Buttons.Col>
          <ModalUI.Buttons.Col>
            <ButtonUI type="primary" onClick={onSubmitClick} fullWidth>
              Продолжить
            </ButtonUI>
          </ModalUI.Buttons.Col>
        </ModalUI.Buttons>
      </ModalUI.Footer>


      <DrawerModalUI
        open={addExercisesFormModalControl.modalProps.open}
        onClose={addExercisesFormModalControl.closeModal}
      >
        <AddExercisesFormModal modalControl={addExercisesFormModalControl} closeModal={closeModal} />
      </DrawerModalUI>


    </>
  );
};
