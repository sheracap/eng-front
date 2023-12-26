import React, { FC, useEffect } from "react";

import { requiredRules, templateTypes } from "#constants/index";
import { $addExercise } from "#stores/exercise";
import { FormUI } from "#ui/form";
import { Form } from "antd";
import { useStore } from "effector-react";
import { ButtonUI } from "#ui/button";

import { ModalUI } from "#ui/modal";
import { RichTextEditorWrapper } from "#src/components/richTextEditor/wrapper";
import { InputUI } from "#ui/input";


type PropTypes = {
  sectionId: number;
  closeModal: () => void;
};

export const TextBlockTemplateForm: FC<PropTypes> = (props) => {
  const { sectionId, closeModal } = props;

  const [form] = Form.useForm();

  const addExerciseState = useStore($addExercise.store);

  useEffect(() => {
    return () => {
      $addExercise.reset();
    };
  }, []);

  useEffect(() => {
    if (addExerciseState.data) {
      closeModal();
    }
  }, [addExerciseState.data]);

  const onFinish = (formData) => {
    const data = {
      title: formData.title,
      sectionId,
      template: templateTypes.TEXT_BLOCK,
      value: JSON.stringify(formData.text),
      answer: null,
      wrongAnswers: null,
    }

    $addExercise.effect(data);
  };

  return (
    <>
      <ModalUI.Header>
        <ModalUI.Title>Шаблон текст</ModalUI.Title>
      </ModalUI.Header>
      <ModalUI.Middle>
        <FormUI phantomSubmit form={form} onFinish={onFinish}>
          <FormUI.Item label="Заголовок" name="title" rules={requiredRules}>
            <InputUI placeholder="Введите заголовок" />
          </FormUI.Item>
          <FormUI.Item label="Текст" name="text" rules={requiredRules}>
            <RichTextEditorWrapper />
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
