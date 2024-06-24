import React, { FC, useEffect } from "react";

import { requiredRules, templateTypes } from "#constants/index";
import { FormUI } from "#ui/form";
import { Form } from "antd";
import { ButtonUI } from "#ui/button";

import { ModalUI } from "#ui/modal";
import { InputUI } from "#ui/input";
import { ExerciseItemModel } from "#businessLogic/models/section";
import { ExerciseCreateModel, ExerciseUpdateModel } from "#businessLogic/models/exercise";


type PropTypes = {
  editableData?: ExerciseItemModel;
  entityId: number;
  isHomework: boolean;
  closeModal: () => void;
  create: (data: ExerciseCreateModel | any) => void;
  update: (data: ExerciseUpdateModel["data"]) => void;
};

export const VideoTemplateForm: FC<PropTypes> = (props) => {
  const { editableData, entityId, isHomework, closeModal, create, update } = props;

  const [form] = Form.useForm();

  useEffect(() => {
    if (editableData) {
      form.setFieldsValue({
        title: editableData.title,
        value: editableData.metaData.url,
      });
    }
  }, []);

  const onFinish = (formData) => {
    const data = {
      title: formData.title,
      sectionId: isHomework ? undefined : entityId,
      homeworkId: isHomework ? entityId : undefined,
      isHomework,
      template: templateTypes.VIDEO,
      metaData: {
        url: formData.value
      }
    }

    if (editableData) {
      update({
        id: editableData.id,
        ...data,
      });
    } else {
      create(data);
    }
  };

  return (
    <>
      <ModalUI.Header>
        <ModalUI.Title>Шаблон видео</ModalUI.Title>
      </ModalUI.Header>
      <ModalUI.Middle>
        <FormUI phantomSubmit form={form} onFinish={onFinish}>
          <FormUI.Item label="Заголовок" name="title" rules={requiredRules}>
            <InputUI placeholder="Введите заголовок" />
          </FormUI.Item>
          <FormUI.Item label="Ссылка на видео" name="value" rules={requiredRules}>
            <InputUI placeholder="Введите заголовок" />
          </FormUI.Item>
        </FormUI>
      </ModalUI.Middle>
      <ModalUI.Footer>
        <ModalUI.Buttons>
          <ModalUI.Buttons.Col>
            <ButtonUI onClick={() => closeModal()} fullWidth>
              Отмена
            </ButtonUI>
          </ModalUI.Buttons.Col>
          <ModalUI.Buttons.Col>
            <ButtonUI type="primary" onClick={() => form.submit()} fullWidth>
              Добавить
            </ButtonUI>
          </ModalUI.Buttons.Col>
        </ModalUI.Buttons>
      </ModalUI.Footer>
    </>
  );
};
