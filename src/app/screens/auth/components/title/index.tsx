import React, { FC } from "react";

import { BackBtn } from "#ui/backBtn";
import { useHistory } from "react-router-dom";

import { useStyles } from "./styles";

interface PropTypes {
  children: string;
  type?: "primary" | "secondary";
  backPath?: string;
}

export const AuthTitle: FC<PropTypes> = (props) => {
  const { children, type = "primary", backPath } = props;
  const classes = useStyles();
  const history = useHistory();

  return (
    <h1 className={`${classes.title} ${classes[type]}`}>
      {backPath && (
        <div className={classes.backBtnWr}>
          <BackBtn backPath={backPath} history={history} />
        </div>
      )}
      {children}
    </h1>
  );
};
