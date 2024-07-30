import React, { FC, useEffect } from "react";
import { useStore } from "effector-react";
import { Form } from "antd";

import { $addHomework, $lessonHomeworks, $updateHomework } from "#stores/homework";

import { requiredRules } from "#constants/index";
import { ModalControlType } from "#hooks/useModalControl";

import { ButtonUI } from "#ui/button";
import { FormUI } from "#ui/form";
import { ModalUI } from "#ui/modal";
import { InputUI } from "#ui/input";
import { notificationSuccess } from "#ui/notifications";


export type AddEditHomeworkModalPropTypes = {
  lessonId: number;
  homeworkDetails?: { id: number; name: string; };
};

type PropTypes = {
  modalControl: ModalControlType<AddEditHomeworkModalPropTypes>;
  callback: ({ id, name }: { id: number; name: string }) => void;
};

export const AddEditHomeworkModal: FC<PropTypes> = (props) => {
  const { modalControl, callback } = props;

  const { closeModal, modalProps } = modalControl;

  const { lessonId, homeworkDetails } = modalProps;

  const [form] = Form.useForm();

  const addHomeworkState = useStore($addHomework.store);
  const updateHomeworkState = useStore($updateHomework.store);

  useEffect(() => {
    if (homeworkDetails) {
      form.setFieldValue("name", homeworkDetails.name);
    }

    return () => {
      $addHomework.reset();
      $updateHomework.reset();
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

  useEffect(() => {
    if (updateHomeworkState.data) {
      notificationSuccess("Данные обновлены", "");

      closeModal();

      const lessonHomeworksState = $lessonHomeworks.store.getState();

      $lessonHomeworks.update({
        ...lessonHomeworksState,
        data: lessonHomeworksState.data.map((item) => ({
          ...item,
          name: item.id === updateHomeworkState.data ? form.getFieldValue("name") : item.name
        }))
      });
    }
  }, [updateHomeworkState.data]);

  const onCancelClick = () => {
    closeModal();
  };

  const onFinish = (formData) => {
    const data = {
      lessonId,
      name: formData.name
    }

    if (homeworkDetails) {
      $updateHomework.effect({
        id: homeworkDetails.id,
        ...data
      });
    } else {
      $addHomework.effect(data);
    }
  };

  return (
    <>
      <ModalUI.Loading show={addHomeworkState.loading || updateHomeworkState.loading} />
      <ModalUI.Header>
        <ModalUI.Title>
          {homeworkDetails ? "Редактировать домашнее задание" : "Добавить домашнее задание"}
        </ModalUI.Title>
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
              {homeworkDetails ? "Сохранить" : "Добавить"}
            </ButtonUI>
          </ModalUI.Buttons.Col>
        </ModalUI.Buttons>
      </ModalUI.Footer>
    </>
  );
};