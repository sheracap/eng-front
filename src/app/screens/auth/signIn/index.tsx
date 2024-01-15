import React, { FC, useEffect } from "react";

import { requiredRules, ROUTES } from "#constants/index";
import { $logIn } from "#stores/account";
import { ErrorResponse } from "#types/apiResponseModels";
import { ButtonUI } from "#ui/button";
import { InputUI } from "#ui/input";
import { Alert, Form } from "antd";
import { useStore } from "effector-react";
import { useHistory } from "react-router-dom";

import { AuthTitle } from "../components/title";
import { initialValuesSignIn } from "../constants";

import { useStyles } from "./styles";

type InitialValuesSignInType = typeof initialValuesSignIn;

export const SignIn: FC = () => {

  const classes = useStyles();
  const history = useHistory();
  const [form] = Form.useForm<InitialValuesSignInType>();

  const logInState = useStore($logIn.store);

  const onFinish = (values: InitialValuesSignInType) => {
    const data = {
      email: values.email,
      password: values.password
    };

    $logIn.effect(data);
  };

  useEffect(() => {
    if (logInState.success) {
      $logIn.reset();
      history.push("/home");
    }
  }, [logInState]);

  const showError = (error: ErrorResponse) => {
    if (!error) return null;

    if (error.status === 401) {
      return <Alert className={classes.error} message="Введен неверный логин или пароль" type="error" />;
    } else if (error) {
      return <Alert className={classes.error} message={error.title || error.message} type="error" />;
    }
  };

  return (
    <div className={classes.signIn}>
      <AuthTitle>Авторизация</AuthTitle>
      {showError(logInState.error)}
      <Form
        className={classes.form}
        layout="vertical"
        initialValues={initialValuesSignIn}
        onFinish={onFinish}
        requiredMark={false}
        form={form}
      >
        <Form.Item label="Логин" name="email" rules={requiredRules}>
          <InputUI placeholder="Введите логин" />
        </Form.Item>
        <Form.Item label="Пароль" name="password" rules={requiredRules}>
          <InputUI.Password placeholder="Введите пароль" variant="auth" />
        </Form.Item>
        <div className={classes.buttonCont}>
          <div>
            <ButtonUI loading={logInState.loading} fullWidth htmlType="submit" type="auth">
              Вход
            </ButtonUI>
          </div>
          <div className={classes.questionLine}>
            <div>Нет аккаунта ?</div>
            <ButtonUI type="auth" onClick={() => history.push(ROUTES.USER_REGISTRATION)}>
              Создать аккаунт
            </ButtonUI>
          </div>
        </div>
      </Form>
    </div>
  );
};
