import React, { FC, useEffect } from "react";

import { $addBookPage, $bookPageDetails, $updateBookPage } from "#stores/books";

import { requiredRules } from "#constants/index";
import { ModalControlType } from "#hooks/useModalControl";

import { ButtonUI } from "#ui/button";
import { FormUI } from "#ui/form";
import { ModalUI } from "#ui/modal";
import { Form } from "antd";
import { useStore } from "effector-react";
import { InputUI } from "#ui/input";


export type AddBookPageModalType = {
  bookId: number;
  bookPageId?: number;
}

type PropTypes = {
  modalControl: ModalControlType<AddBookPageModalType>;
  callback: () => void;
};

export const AddBookPageModal: FC<PropTypes> = (props) => {
  const { modalControl, callback } = props;

  const { bookId, bookPageId } = modalControl.modalProps;

  const [form] = Form.useForm();

  const addBookPageState = useStore($addBookPage.store);
  const updateBookPageState = useStore($updateBookPage.store);
  const bookPageDetailsState = useStore($bookPageDetails.store);


  useEffect(() => {
    if (bookPageId) {
      $bookPageDetails.effect(bookPageId);
    }

    return () => {
      $addBookPage.reset();
      $updateBookPage.reset();
      $bookPageDetails.reset();
    };
  }, []);

  useEffect(() => {
    if (bookPageId && bookPageDetailsState.data[bookPageId]) {
      const pageData = bookPageDetailsState.data[bookPageId];

      form.setFieldsValue({
        title: pageData.title,
        text: pageData.text
      });
    }
  }, [bookPageDetailsState.data]);

  useEffect(() => {
    if (addBookPageState.data) {
      modalControl.closeModal();

      callback();
    }
  }, [addBookPageState.data]);

  useEffect(() => {
    if (updateBookPageState.data) {
      modalControl.closeModal();

      callback();
    }
  }, [updateBookPageState.data]);


  const onCancelClick = () => {
    modalControl.closeModal();
  };

  const onFinish = (formData) => {
    const data = {
      title: formData.title || null,
      text: formData.text,
      bookId,
    };

    if (bookPageId) {
      $updateBookPage.effect({
        id: bookPageId,
        ...data
      });
    } else {
      $addBookPage.effect(data);
    }
  };

  return (
    <>
      <ModalUI.Loading show={addBookPageState.loading || updateBookPageState.loading} />
      <ModalUI.Header>
        <ModalUI.Title>{bookPageId ? "Редактирование" : "Добавить"}</ModalUI.Title>
      </ModalUI.Header>
      <ModalUI.Middle>
        <FormUI phantomSubmit form={form} onFinish={onFinish}>

          <FormUI.Item label="Глава (необязательное поле)" name="title">
            <InputUI placeholder="Введите название" />
          </FormUI.Item>

          <FormUI.Item label="Текст" name="text" rules={requiredRules}>
            <InputUI.TextArea placeholder="Введите текст" rows={16} showCount maxLength={2000} />
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
              {bookPageId ? "Сохранить" : "Добавить"}
            </ButtonUI>
          </ModalUI.Buttons.Col>
        </ModalUI.Buttons>
      </ModalUI.Footer>
    </>
  );
};
