import React, { FC, useState } from "react";

import { RegistrationStep1 } from "#src/app/screens/auth/registration/step1";
import { RegistrationStep2 } from "#src/app/screens/auth/registration/step2";

import { useStyles } from "./styles";

export const Registration: FC = () => {

  const classes = useStyles();

  const [step, setStep] = useState<{ number: number; email: string; }>({
    number: 1,
    email: ""
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
      {step.number === 2 && (
        <RegistrationStep2 email={step.email} />
      )}
    </div>
  );
};
