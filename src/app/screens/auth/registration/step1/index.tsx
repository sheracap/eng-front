import React, { FC, useEffect } from "react";

import { requiredRules } from "#constants/index";
import { $registration } from "#stores/account";
import { ButtonUI } from "#ui/button";
import { InputUI } from "#ui/input";
import { Form } from "antd";
import { useStore } from "effector-react";

import { AuthTitle } from "../../components/title";
import { initialValuesSignIn } from "../../constants";

import { useStyles } from "../styles";
import { RoleSelect } from "#pickers/roleSelect";

type PropsTypes = {
  setStep: React.Dispatch<React.SetStateAction<{ number: number; data: null | { name: string; email: string; roleId: number; password: string; } }>>
}

export const RegistrationStep1: FC<PropsTypes> = (props) => {
  const { setStep } = props;

  const classes = useStyles();
  const [form] = Form.useForm();

  const registrationState = useStore($registration.store);

  const onFinish = (values) => {
    // check is correct email validation

    const data = {
      roleId: values.roleId,
      name: values.name,
      email: values.email,
      password: values.password
    };

    $registration.effect(data);
  };

  useEffect(() => {
    if (registrationState.success) {
      const data = form.getFieldsValue(true);

      setStep({
        number: 2,
        data: {
          name: data.name,
          email: data.email,
          roleId: data.roleId,
          password: data.password
        },
      });
      $registration.reset();
    }
  }, [registrationState]);

  return (
    <div className={classes.signIn}>
      <AuthTitle>Регистрация</AuthTitle>
      <Form
        className={classes.form}
        layout="vertical"
        initialValues={initialValuesSignIn}
        onFinish={onFinish}
        requiredMark={false}
        form={form}
      >
        <Form.Item label="Роль" name="roleId" rules={requiredRules}>
          <RoleSelect />
        </Form.Item>
        <Form.Item label="Имя" name="name" rules={requiredRules}>
          <InputUI placeholder="Введите имя" />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={requiredRules}>
          <InputUI placeholder="Введите email" />
        </Form.Item>
        <Form.Item label="Пароль" name="password" rules={requiredRules}>
          <InputUI.Password placeholder="Введите пароль" variant="auth" autoComplete="new-password" />
        </Form.Item>
        <div className={classes.buttonCont}>
          <ButtonUI loading={registrationState.loading} htmlType="submit" type="auth">
            Создать
          </ButtonUI>
        </div>
      </Form>
    </div>
  );
};
