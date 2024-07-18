import React, { FC, useEffect } from "react";

import { requiredRules } from "#constants/index";
import { $registration } from "#stores/account";
import { ButtonUI } from "#ui/button";
import { InputUI } from "#ui/input";
import { Form } from "antd";
import { useStore } from "effector-react";

import { AuthTitle } from "../../components/title";
import { initialValuesSignIn } from "../../constants";

import { useStyles } from "../../styles";
import { RoleSelect } from "#pickers/roleSelect";
import { LanguageSelect } from "#pickers/languageSelect";

type PropsTypes = {
  setStep: React.Dispatch<React.SetStateAction<{
    number: number; data: null | { name: string; email: string; roleId: number; password: string; language: string; }
  }>>;
}

export const RegistrationStep1: FC<PropsTypes> = (props) => {
  const { setStep } = props;

  const classes = useStyles();
  const [form] = Form.useForm();

  const registrationState = useStore($registration.store);

  useEffect(() => {
    if (registrationState.success) {
      const data = form.getFieldsValue(true);

      setStep({
        number: 2,
        data: {
          name: data.name,
          email: data.email,
          roleId: data.roleId,
          password: data.password,
          language: data.language
        },
      });
      $registration.reset();
    }
  }, [registrationState]);


  const onFinish = (values) => {
    // check is correct email validation

    const data = {
      roleId: values.roleId,
      name: values.name,
      email: values.email,
      password: values.password,
      language: values.language
    };

    $registration.effect(data);
  };

  return (
    <div className={classes.signIn}>
      <AuthTitle>Регистрация</AuthTitle>
      <Form
        className={classes.form}
        layout="vertical"
        initialValues={initialValuesSignIn}
        onFinish={onFinish}
        form={form}
      >
        <Form.Item label="Роль" name="roleId" rules={requiredRules}>
          <RoleSelect />
        </Form.Item>
        <Form.Item label="Язык обучения" name="language" rules={requiredRules}>
          <LanguageSelect />
        </Form.Item>
        <Form.Item label="Имя" name="name" rules={requiredRules}>
          <InputUI placeholder="Введите имя" />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={requiredRules}>
          <InputUI placeholder="Введите email" />
        </Form.Item>
        <Form.Item label="Придумайте пароль" name="password" rules={requiredRules}>
          <InputUI.Password placeholder="Введите пароль" variant="auth" autoComplete="new-password" />
        </Form.Item>
        <div className={classes.regButtonCont}>
          <ButtonUI loading={registrationState.loading} fullWidth htmlType="submit" type="primary">
            Продолжить
          </ButtonUI>
        </div>
      </Form>
    </div>
  );
};
