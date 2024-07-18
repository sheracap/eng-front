import React, { FC, useEffect } from "react";
import { useStore } from "effector-react";
import { useHistory } from "react-router-dom";
import { Form } from "antd";

import { $verifyNewPassword } from "#stores/account";

import { ROUTES } from "#constants/index";

import { ButtonUI } from "#ui/button";
import { notificationWarning } from "#ui/notifications";

import { AuthTitle } from "../../components/title";

import { useStyles } from "../../styles";

type PropsTypes = {
  data: {
    email: string;
    password: string;
  }
}

export const ForgotPasswordStep2: FC<PropsTypes> = (props) => {
  const { data } = props;

  const history = useHistory();
  const classes = useStyles();
  const [form] = Form.useForm();

  const verifyNewPasswordState = useStore($verifyNewPassword.store);

  useEffect(() => {
    if (verifyNewPasswordState.success) {
      notificationWarning("Новый пароль установлен", "");
      $verifyNewPassword.reset();
      // todo enter app
      history.push(ROUTES.USER_SIGN_IN);
    }
  }, [verifyNewPasswordState]);

  const onVerificationCodeChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, '');

    if (value.length > 6) {
      value = value.substring(0, 6);
    }

    form.setFieldValue("verificationCode", value);
  }

  const onFinish = (values) => {
    if (values.verificationCode?.length < 6) {
      notificationWarning("Неверное кол-во символов", "");
    }

    const regData = {
      email: data.email,
      password: data.password,
      verificationCode: String(values.verificationCode)
    };

    $verifyNewPassword.effect(regData);
  };

  return (
    <div className={classes.signIn}>
      <AuthTitle>Код подтверждения</AuthTitle>
      <Form
        className={classes.form}
        layout="vertical"
        onFinish={onFinish}
        form={form}
      >
        <div style={{ marginBottom: "10px" }}>
          На ваш Email был отправлен 6-значный код. Введите этот код для подтверждения.
        </div>
        <Form.Item
          name="verificationCode"
        >
          <input
            className="ant-input auth-input"
            placeholder="Введите код"
            onChange={onVerificationCodeChange}
            type="tel"
          />
        </Form.Item>
        <div className={classes.regButtonCont}>
          <ButtonUI loading={verifyNewPasswordState.loading} fullWidth htmlType="submit" type="primary">
            Подтвердить
          </ButtonUI>
        </div>
      </Form>
    </div>
  );
};
