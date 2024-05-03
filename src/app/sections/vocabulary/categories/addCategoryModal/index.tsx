import React, { FC, useEffect } from "react";

import { ModalControlType } from "#hooks/useModalControl";
import { $createWordCategory } from "#stores/words";
import { ButtonUI } from "#ui/button";
import { FormUI } from "#ui/form";
import { ModalUI } from "#ui/modal";
import { Form } from "antd";
import { useStore } from "effector-react";
import { InputUI } from "#ui/input";
import { notificationSuccess } from "#ui/notifications";
import { requiredRules } from "#constants/index";
import { WordCategoryItemModel } from "#businessLogic/models/vocabulary";

type PropTypes = {
  modalControl: ModalControlType;
  callback: (item: WordCategoryItemModel) => void;
};

export const AddWordCategoryModal: FC<PropTypes> = (props) => {
  const { modalControl, callback } = props;

  const [form] = Form.useForm();

  const createWordCategoryState = useStore($createWordCategory.store);

  useEffect(() => {

    return () => {
      $createWordCategory.reset();
    };
  }, []);

  useEffect(() => {
    if (createWordCategoryState.data) {
      notificationSuccess("Категория создана", "");

      callback(createWordCategoryState.data);

      modalControl.closeModal();
    }
  }, [createWordCategoryState.data]);

  const onCancelClick = () => {
    modalControl.closeModal();
  };

  const onFinish = (formData) => {
    const data = {
      name: formData.name,
      //parentId
    };

    $createWordCategory.effect(data);
  };

  return (
    <>
      <ModalUI.Loading show={createWordCategoryState.loading} />
      <ModalUI.Header>
        <ModalUI.Title>Добавить категорию</ModalUI.Title>
      </ModalUI.Header>
      <ModalUI.Middle>
        <FormUI phantomSubmit form={form} onFinish={onFinish}>
          <FormUI.Item label="Название" name="name" rules={requiredRules}>
            <InputUI placeholder="Введите название категории" />
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
              Пригласить
            </ButtonUI>
          </ModalUI.Buttons.Col>
        </ModalUI.Buttons>
      </ModalUI.Footer>
    </>
  );
};
