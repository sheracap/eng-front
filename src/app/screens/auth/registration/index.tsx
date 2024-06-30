import React, { FC, useState } from "react";

import { RegistrationStep1 } from "./step1";
import { RegistrationStep2 } from "./step2";

import { useStyles } from "./styles";

export const Registration: FC = () => {

  const classes = useStyles();

  const [step, setStep] = useState<{ number: number; data: null | { name: string; email: string; roleId: number; password: string; } }>({
    number: 1,
    data: null
  });

  // useEffect(() => {
  //   if (registrationState.success) {
  //     $registration.reset();
  //     history.push(ROUTES.USER_SIGN_IN);
  //   }
  // }, [registrationState]);

  return (
    <div className={classes.signIn}>
      {step.number === 1 && (
        <RegistrationStep1 setStep={setStep} />
      )}
      {step.number === 2 && step.data && (
        <RegistrationStep2 data={step.data} />
      )}
    </div>
  );
};
