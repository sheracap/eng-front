import React, { FC, useEffect } from "react";
import { Form } from "antd";
import { useStore } from "effector-react";

import { $forgotPassword } from "#stores/account";

import { requiredRules } from "#constants/index";

import { ButtonUI } from "#ui/button";
import { InputUI } from "#ui/input";


import { AuthTitle } from "../../components/title";

import { initialValuesSignIn } from "../../constants";

import { useStyles } from "../../styles";

type PropsTypes = {
  setStep: React.Dispatch<React.SetStateAction<{
    number: number; data: null | { email: string; password: string; }
  }>>;
}

// todo confirm password field

export const ForgotPasswordStep1: FC<PropsTypes> = (props) => {
  const { setStep } = props;

  const classes = useStyles();
  const [form] = Form.useForm();

  const forgotPasswordState = useStore($forgotPassword.store);

  useEffect(() => {
    if (forgotPasswordState.success) {
      const data = form.getFieldsValue(true);

      setStep({
        number: 2,
        data: {
          email: data.email,
          password: data.password,
        },
      });
      $forgotPassword.reset();
    }
  }, [forgotPasswordState]);


  const onFinish = (values) => {
    // check is correct email validation

    const data = {
      email: values.email,
    };

    $forgotPassword.effect(data);
  };

  return (
    <div className={classes.signIn}>
      <AuthTitle>Восстановление пароля</AuthTitle>
      <Form
        className={classes.form}
        layout="vertical"
        initialValues={initialValuesSignIn}
        onFinish={onFinish}
        requiredMark={false}
        form={form}
      >
        <Form.Item label="Email" name="email" rules={requiredRules}>
          <InputUI placeholder="Введите email" />
        </Form.Item>
        <Form.Item label="Придумайте пароль" name="password" rules={requiredRules}>
          <InputUI.Password placeholder="Введите пароль" variant="auth" autoComplete="new-password" />
        </Form.Item>
        <div className={classes.buttonCont}>
          <ButtonUI loading={forgotPasswordState.loading} htmlType="submit" type="auth">
            Продолжить
          </ButtonUI>
        </div>
      </Form>
    </div>
  );
};
