import React, { FC, useEffect } from "react";

import { requiredRules } from "#constants/index";
import * as accountEffector from "#stores/account";
import { ButtonUI } from "#ui/button";
import { InputUI } from "#ui/input";
import { Form } from "antd";
import { useStore } from "effector-react";
import { useHistory } from "react-router-dom";

import { AuthTitle } from "../components/title";
import { initialValuesSignIn } from "../constants";

import { useStyles } from "./styles";
import { RoleSelect } from "#pickers/roleSelect";

export const Registration: FC = () => {
  const { $registration } = accountEffector;
  const classes = useStyles();
  const history = useHistory();
  const [form] = Form.useForm();

  const registrationState = useStore($registration.store);

  const onFinish = (values) => {
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
      $registration.reset();
      history.push("/");
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
