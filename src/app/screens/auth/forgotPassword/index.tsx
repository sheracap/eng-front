import React, { FC, useState } from "react";

import { ForgotPasswordStep1 } from "./step1";
import { ForgotPasswordStep2 } from "./step2";

import { useStyles } from "../styles";
import { Link } from "react-router-dom";
import { ROUTES } from "#constants/index";

export const ForgotPassword: FC = () => {

  const classes = useStyles();

  const [step, setStep] = useState<{ number: number; data: null | { email: string; password: string; } }>({
    number: 1,
    data: null
  });

  return (
    <div className={classes.signIn}>
      {step.number === 1 && (
        <ForgotPasswordStep1 setStep={setStep} />
      )}
      {step.number === 2 && step.data && (
        <ForgotPasswordStep2 data={step.data} />
      )}
      <div className={classes.questionLine}>
        <Link to={ROUTES.USER_SIGN_IN}>Авторизация</Link>
      </div>
    </div>
  );
};
