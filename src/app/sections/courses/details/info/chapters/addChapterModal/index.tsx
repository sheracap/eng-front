import React, { FC, useEffect } from "react";

import { requiredRules } from "#constants/index";
import { ModalControlType } from "#hooks/useModalControl";
import { $addChapter, $updateChapter } from "#stores/chapter";
import { ButtonUI } from "#ui/button";
import { FormUI } from "#ui/form";
import { ModalUI } from "#ui/modal";
import { Form } from "antd";
import { useStore } from "effector-react";
import { InputUI } from "#ui/input";
import { CourseChapterItemModel } from "#businessLogic/models/courses";
import { notificationSuccess } from "#ui/notifications";


export type AddChapterModalPropTypes = {
  courseId: number;
  chapterDetails?: CourseChapterItemModel;
};

type PropTypes = {
  modalControl: ModalControlType<AddChapterModalPropTypes>;
  callback: () => void;
};

export const AddChapterModal: FC<PropTypes> = (props) => {
  const { modalControl, callback } = props;

  const { closeModal, modalProps } = modalControl;

  const { courseId, chapterDetails } = modalProps;

  const [form] = Form.useForm();

  const addChapterState = useStore($addChapter.store);
  const updateChapterState = useStore($updateChapter.store);

  useEffect(() => {
    if (chapterDetails) {
      form.setFieldsValue({
        name: chapterDetails.name
      });
    }

    return () => {
      $addChapter.reset();
      $updateChapter.reset();
    };
  }, []);

  useEffect(() => {
    if (addChapterState.data) {
      notificationSuccess("Глава добавлена", "");
      closeModal();
      callback();
    }
  }, [addChapterState.data]);

  useEffect(() => {
    if (updateChapterState.data) {
      notificationSuccess("Глава обновлена", "");
      closeModal();
      callback();
    }
  }, [updateChapterState.data]);

  const onCancelClick = () => {
    closeModal();
  };

  const onFinish = (formData) => {
    const data = {
      courseId,
      name: formData.name
    };

    if (chapterDetails) {
      $updateChapter.effect({
        id: chapterDetails.id,
        ...data
      });
    } else {
      $addChapter.effect(data);
    }
  };

  return (
    <>
      <ModalUI.Loading show={addChapterState.loading || updateChapterState.loading} />
      <ModalUI.Header>
        <ModalUI.Title>Добавить главу</ModalUI.Title>
      </ModalUI.Header>
      <ModalUI.Middle>
        <FormUI phantomSubmit form={form} onFinish={onFinish}>
          <FormUI.Item label="Название" name="name" rules={requiredRules}>
            <InputUI placeholder="Введите название главы" />
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
