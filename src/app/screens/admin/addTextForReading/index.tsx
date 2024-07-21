import React, { FC, useEffect } from "react";

import { $addTextForReading } from "#stores/textForReading";

import { requiredRules } from "#constants/index";
import { ModalControlType } from "#hooks/useModalControl";

import { ButtonUI } from "#ui/button";
import { FormUI } from "#ui/form";
import { ModalUI } from "#ui/modal";
import { Form } from "antd";
import { useStore } from "effector-react";
import { InputUI } from "#ui/input";
import { LanguageSelect } from "#pickers/languageSelect";
import { LevelSelect } from "#pickers/levelSelect";


export type AddTextForReadingModalType = {

}

type PropTypes = {
  modalControl: ModalControlType<AddTextForReadingModalType>;
};

export const AddTextForReadingModal: FC<PropTypes> = (props) => {
  const { modalControl } = props;

  const [form] = Form.useForm();

  const addTextForReadingState = useStore($addTextForReading.store);


  useEffect(() => {

    return () => {
      $addTextForReading.reset();
    };
  }, []);

  useEffect(() => {
    if (addTextForReadingState.success) {
      modalControl.closeModal();
    }
  }, [addTextForReadingState.success]);

  const onCancelClick = () => {
    modalControl.closeModal();
  };

  const onFinish = (formData) => {
    const data = {
      title: formData.title,
      text: formData.text,
      language: formData.language,
      level: formData.level,
    }

    $addTextForReading.effect(data);
  };

  return (
    <>
      <ModalUI.Loading show={addTextForReadingState.loading} />
      <ModalUI.Header>
        <ModalUI.Title>Добавить</ModalUI.Title>
      </ModalUI.Header>
      <ModalUI.Middle>
        <FormUI phantomSubmit form={form} onFinish={onFinish}>
          <FormUI.Item label="Заголовок" name="title" rules={requiredRules}>
            <InputUI placeholder="Введите заголовок" />
          </FormUI.Item>

          <Form.Item label="Язык обучения" name="language" rules={requiredRules}>
            <LanguageSelect />
          </Form.Item>

          <Form.Item label="Уровень" name="level" rules={requiredRules}>
            <LevelSelect />
          </Form.Item>

          <FormUI.Item label="Текст" name="text">
            <InputUI.TextArea placeholder="Введите текст" />
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
