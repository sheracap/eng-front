import React, { FC, useEffect } from "react";

import { requiredRules } from "#constants/index";
import { ModalControlType } from "#hooks/useModalControl";
import { $addHomework } from "#stores/homework";
import { ButtonUI } from "#ui/button";
import { FormUI } from "#ui/form";
import { ModalUI } from "#ui/modal";
import { Form } from "antd";
import { useStore } from "effector-react";
import { InputUI } from "#ui/input";


export type AddHomeworkModalPropTypes = {
  lessonId: number;
};

type PropTypes = {
  modalControl: ModalControlType<AddHomeworkModalPropTypes>;
  callback: ({ id, name }: { id: number; name: string }) => void;
};

export const AddHomeworkModal: FC<PropTypes> = (props) => {
  const { modalControl, callback } = props;

  const { closeModal, modalProps } = modalControl;

  const { lessonId } = modalProps;

  const [form] = Form.useForm();

  const addHomeworkState = useStore($addHomework.store);

  useEffect(() => {
    return () => {
      $addHomework.reset();
    };
  }, []);

  useEffect(() => {
    if (addHomeworkState.data) {
      const createdElemId = addHomeworkState.data;
      closeModal();
      callback({
        id: createdElemId,
        name: form.getFieldValue("name")
      });
    }
  }, [addHomeworkState.data]);

  const onCancelClick = () => {
    closeModal();
  };

  const onFinish = (formData) => {
    const data = {
      lessonId,
      name: formData.name
    }

    $addHomework.effect(data);
  };

  return (
    <>
      <ModalUI.Loading show={addHomeworkState.loading} />
      <ModalUI.Header>
        <ModalUI.Title>Добавить домашнее задание</ModalUI.Title>
      </ModalUI.Header>
      <ModalUI.Middle>
        <FormUI phantomSubmit form={form} onFinish={onFinish}>
          <FormUI.Item label="Название" name="name" rules={requiredRules}>
            <InputUI placeholder="Введите название" />
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
              Добавить
            </ButtonUI>
          </ModalUI.Buttons.Col>
        </ModalUI.Buttons>
      </ModalUI.Footer>
    </>
  );
};