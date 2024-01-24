import React, { FC, useEffect } from "react";

import { ModalControlType } from "#hooks/useModalControl";
import { $inviteStudent } from "#stores/students";
import { ButtonUI } from "#ui/button";
import { FormUI } from "#ui/form";
import { ModalUI } from "#ui/modal";
import { Form } from "antd";
import { useStore } from "effector-react";
import { InputUI } from "#ui/input";

type PropTypes = {
  modalControl: ModalControlType;
  callback?: () => void;
};

export const InviteStudentModal: FC<PropTypes> = (props) => {
  const { modalControl, callback } = props;

  const [form] = Form.useForm();

  const inviteStudentState = useStore($inviteStudent.store);

  useEffect(() => {

    return () => {
      $inviteStudent.reset();
    };
  }, []);

  useEffect(() => {
    if (inviteStudentState.success) {
      modalControl.closeModal();
      callback && callback();
    }
  }, [inviteStudentState.success]);

  const onCancelClick = () => {
    modalControl.closeModal();
  };

  const onFinish = (formData) => {
    const data = {
      email: formData.email
    };

    $inviteStudent.effect(data);
  };

  return (
    <>
      <ModalUI.Loading show={inviteStudentState.loading} />
      <ModalUI.Header>
        <ModalUI.Title>Пригласить ученика</ModalUI.Title>
      </ModalUI.Header>
      <ModalUI.Middle>
        <FormUI phantomSubmit form={form} onFinish={onFinish}>
          <FormUI.Item label="Email" name="email" rules={[{ type: "email" }]}>
            <InputUI placeholder="Введите email ученика" />
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
