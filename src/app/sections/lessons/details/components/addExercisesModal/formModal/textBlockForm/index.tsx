import React, { FC, useEffect } from "react";

import { requiredRules, templateTypes } from "#constants/index";
import { $addExercise, $updateExercise } from "#stores/exercise";
import { FormUI } from "#ui/form";
import { Form } from "antd";
import { useStore } from "effector-react";
import { ButtonUI } from "#ui/button";

import { ModalUI } from "#ui/modal";
import { RichTextEditorWrapper } from "#src/components/richTextEditor/wrapper";
import { InputUI } from "#ui/input";
import { ExerciseItemModel } from "#businessLogic/models/section";


type PropTypes = {
  editableData?: ExerciseItemModel;
  sectionId: number;
  closeModal: () => void;
};

export const TextBlockTemplateForm: FC<PropTypes> = (props) => {
  const { editableData, sectionId, closeModal } = props;

  const [form] = Form.useForm();

  const addExerciseState = useStore($addExercise.store);
  const updateExerciseState = useStore($updateExercise.store);

  useEffect(() => {


    if (editableData) {
      form.setFieldsValue({
        title: editableData.title,
        text: JSON.parse(editableData.metaData.text),
        initText: JSON.parse(editableData.metaData.text),
      });
    }

    return () => {
      $addExercise.reset();
      $updateExercise.reset();
    };
  }, []);

  useEffect(() => {
    if (addExerciseState.data) {
      closeModal();
    }
  }, [addExerciseState.data]);

  useEffect(() => {
    if (updateExerciseState.data) {
      closeModal();
    }
  }, [updateExerciseState.data]);

  const onFinish = (formData) => {

    const data = {
      title: formData.title,
      sectionId,
      template: templateTypes.TEXT_BLOCK,
      metaData: {
        text: JSON.stringify(formData.text)
      },
    }

    if (editableData) {
      $updateExercise.effect({
        id: editableData.id,
        ...data,
      });
    } else {
      $addExercise.effect(data);
    }
  };

  return (
    <>
      <ModalUI.Header>
        <ModalUI.Title>Шаблон текст</ModalUI.Title>
      </ModalUI.Header>
      <ModalUI.Middle>
        <FormUI
          phantomSubmit
          form={form}
          onFinish={onFinish}
        >
          <FormUI.Item label="Заголовок" name="title" rules={requiredRules}>
            <InputUI placeholder="Введите заголовок" />
          </FormUI.Item>
          <FormUI.Item shouldUpdate={(prevValues, curValues) => prevValues.initDescription !== curValues.initDescription}>
            {() => {
              const initText = form.getFieldValue("initText");

              return (
                <FormUI.Item label="Текст" name="text" rules={requiredRules}>
                  <RichTextEditorWrapper initialValue={initText} />
                </FormUI.Item>
              )
            }}
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
