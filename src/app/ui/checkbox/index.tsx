import React from "react";

import { Checkbox } from "antd";

import { useStyles } from "./styles";

type PropsType = any;

export const CheckboxUI: React.FC<PropsType> = (props) => {
  const { className, ...restProps } = props;
  useStyles();

  let classesCompose = "ui-checkbox";

  if (className) {
    classesCompose = `${classesCompose} ${className}`;
  }

  return <Checkbox className={classesCompose} {...restProps} />;
};
