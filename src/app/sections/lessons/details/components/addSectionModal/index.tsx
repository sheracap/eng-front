import React, { FC, useEffect } from "react";

import { requiredRules } from "#constants/index";
import { ModalControlType } from "#hooks/useModalControl";
import { $addSection } from "#stores/section";
import { ButtonUI } from "#ui/button";
import { FormUI } from "#ui/form";
import { ModalUI } from "#ui/modal";
import { Form } from "antd";
import { useStore } from "effector-react";
import { InputUI } from "#ui/input";


export type AddSectionModalPropTypes = {
  lessonId: number;
};

type PropTypes = {
  modalControl: ModalControlType<AddSectionModalPropTypes>;
  callback: ({ id, name }: { id: number; name: string }) => void;
};

export const AddSectionModal: FC<PropTypes> = (props) => {
  const { modalControl, callback } = props;

  const { closeModal, modalProps } = modalControl;

  const { lessonId } = modalProps;

  const [form] = Form.useForm();

  const addSectionState = useStore($addSection.store);

  useEffect(() => {
    return () => {
      $addSection.reset();
    };
  }, []);

  useEffect(() => {
    if (addSectionState.data) {
      const createdElemId = addSectionState.data;
      closeModal();
      callback({
        id: createdElemId,
        name: form.getFieldValue("name")
      });
    }
  }, [addSectionState.data]);

  const onCancelClick = () => {
    closeModal();
  };

  const onFinish = (formData) => {
    const data = {
      lessonId,
      name: formData.name
    }

    $addSection.effect(data);
  };

  return (
    <>
      <ModalUI.Loading show={addSectionState.loading} />
      <ModalUI.Header>
        <ModalUI.Title>Добавить раздел</ModalUI.Title>
      </ModalUI.Header>
      <ModalUI.Middle>
        <FormUI phantomSubmit form={form} onFinish={onFinish}>
          <FormUI.Item label="Название" name="name" rules={requiredRules}>
            <InputUI placeholder="Введите название раздела" />
          </FormUI.Item>
        </FormUI>
      </ModalUI.Middle>
      <ModalUI.Footer>
        <ModalUI.Buttons>
          <ModalUI.Buttons.Col>
            <ButtonUI type="secondary" onClick={onCancelClick}>
              Отмена
            </ButtonUI>
          </ModalUI.Buttons.Col>
          <ModalUI.Buttons.Col>
            <ButtonUI type="primary" onClick={() => form.submit()}>
              Сохранить
            </ButtonUI>
          </ModalUI.Buttons.Col>
        </ModalUI.Buttons>
      </ModalUI.Footer>
    </>
  );
};
