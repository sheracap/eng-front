import React, { FC } from "react";

import { Button } from "antd";
import { ButtonProps } from "antd/lib/button";
import { Link } from "react-router-dom";

import { useStyles } from "./styles";

const getLinkSizeClass = (size?: string) => {
  if (size === "large") {
    return "ant-btn-lg";
  } else if (size === "small") {
    return "ant-btn-sm";
  }

  return "";
};

interface PropsType extends Omit<ButtonProps, "type"> {
  type?: "primary" | "primary-light" | "secondary" | "auth" | "bordered" | "light-blue";
  fullWidth?: boolean;
  withIcon?: boolean;
  link?: string;
  noBorder?: boolean;
}

export const ButtonUI: FC<PropsType> = (props) => {
  const classes = useStyles();

  const { className = "", withIcon, fullWidth, link, noBorder, type, ...restProps } = props;

  let classesCompose = `${classes.btn} custom-btn`;

  if (className) {
    classesCompose = `${classesCompose} ${className}`;
  }

  if (type) {
    classesCompose = `${classesCompose} ${
      // @ts-ignore
      type === "primary" ? "ant-btn-primary" : classes[type]
    }`;
  }

  if (withIcon) {
    classesCompose = `${classesCompose} ${classes.btnWithIcon}`;
  }

  if (fullWidth) {
    classesCompose = `${classesCompose} ${classes.fullWidth}`;
  }

  if (noBorder) {
    classesCompose = `${classesCompose} ${classes.noBorder}`;
  }

  if (link) {
    classesCompose = `ant-btn ${classesCompose} ${getLinkSizeClass(props.size)}`;

    // @ts-ignore
    return <Link {...restProps} to={link} className={classesCompose} />;
  }

  return <Button {...restProps} className={classesCompose} />;
};
