import React, { FC, useEffect } from "react";

import { ROUTES } from "#constants/index";
import { $verifyRegistration } from "#stores/account";
import { ButtonUI } from "#ui/button";
import { Form } from "antd";
import { useStore } from "effector-react";

import { AuthTitle } from "../../components/title";

import { useStyles } from "../styles";
import { notificationWarning } from "#ui/notifications";
import { useHistory } from "react-router-dom";

type PropsTypes = {
  data: {
    name: string;
    email: string;
    roleId: number;
    password: string;
  }
}

export const RegistrationStep2: FC<PropsTypes> = (props) => {
  const { data } = props;

  const history = useHistory();
  const classes = useStyles();
  const [form] = Form.useForm();

  const verifyRegistrationState = useStore($verifyRegistration.store);

  useEffect(() => {
    if (verifyRegistrationState.success) {
      $verifyRegistration.reset();
      history.push(ROUTES.USER_SIGN_IN);
    }
  }, [verifyRegistrationState]);

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
      name: data.name,
      roleId: data.roleId,
      password: data.password,
      verificationCode: String(values.verificationCode)
    };

    $verifyRegistration.effect(regData);
  };

  return (
    <div className={classes.signIn}>
      <AuthTitle>Код подтверждения</AuthTitle>
      <Form
        className={classes.form}
        layout="vertical"
        onFinish={onFinish}
        requiredMark={false}
        form={form}
      >
        <div>
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
        <div className={classes.buttonCont}>
          <ButtonUI loading={verifyRegistrationState.loading} htmlType="submit" type="auth">
            Подтвердить
          </ButtonUI>
        </div>
      </Form>
    </div>
  );
};
