import React, { FC, useMemo } from "react";

import { ModalControlType, useModalControl } from "#hooks/useModalControl";
import { ButtonUI } from "#ui/button";
import { ModalUI } from "#ui/modal";


import styles from "./styles.module.scss";
import { DrawerModalUI } from "#ui/drawerModal";
import {
  AddEditExercisesFormModal,
  AddEditExercisesFormModalPropTypes
} from "./formModal";
import { templateTypes } from "#constants/index";

export type AddExercisesModalPropTypes = {
  entityId: number;
  isHomework: boolean;
};

type TProps = {
  modalControl: ModalControlType<AddExercisesModalPropTypes>;
  callback: () => void;
};

export const AddExercisesModal: FC<TProps> = (props) => {
  const { modalControl, callback } = props;
  const { closeModal, modalProps } = modalControl;
  const { entityId, isHomework } = modalProps;

  const addExercisesFormModalControl = useModalControl<AddEditExercisesFormModalPropTypes>();

  const templateList = useMemo(() => {
    return [
      { id: 1, name: "Тест", code: templateTypes.TEST },
      { id: 2, name: "Текстовый блок", code: templateTypes.TEXT_BLOCK },
      { id: 3, name: "Заполнить поля", code: templateTypes.BLANK },
      { id: 4, name: "Заполнить текст", code: templateTypes.FILL_TEXT },
      { id: 5, name: "Видео", code: templateTypes.VIDEO },
      { id: 6, name: "Изображение", code: templateTypes.IMAGES },
      { id: 7, name: "Аудио", code: templateTypes.AUDIO },
    ]
  }, []);

  const onSelectTemplate = (val: string) => {
    addExercisesFormModalControl.openModal({ entityId, isHomework, template: val });
  };

  return (
    <>
      <ModalUI.Header>
        <ModalUI.Title>Выберите шаблон упражнения</ModalUI.Title>
      </ModalUI.Header>
      <ModalUI.Middle>
        <div className={styles.templatesList}>
          {templateList.map((item) => (
            <div
              className={`${styles.templateItem}`}
              onClick={() => onSelectTemplate(item.code)}
              key={item.id}
            >
              {item.name}
            </div>
          ))}
        </div>
      </ModalUI.Middle>
      <ModalUI.Footer>
        <ModalUI.Buttons>
          <ModalUI.Buttons.Col>
            <ButtonUI onClick={() => modalControl.closeModal()} fullWidth>
              Отмена
            </ButtonUI>
          </ModalUI.Buttons.Col>
        </ModalUI.Buttons>
      </ModalUI.Footer>


      <DrawerModalUI
        open={addExercisesFormModalControl.modalProps.open}
        onClose={addExercisesFormModalControl.closeModal}
      >
        <AddEditExercisesFormModal
          modalControl={addExercisesFormModalControl}
          closeModal={closeModal}
          callback={callback}
        />
      </DrawerModalUI>


    </>
  );
};
