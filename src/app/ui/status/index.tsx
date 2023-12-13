import React, { FC, ReactNode } from "react";

import { Tag } from "antd";

import { useStyles } from "./styles";

type PropTypes = {
  className?: string;
  status: string;
  color?: string;
  children: ReactNode | ReactNode[];
};

export const StatusUI: FC<PropTypes> = (props) => {
  const { className = "", status, color, children } = props;
  const classes = useStyles({ status, color });

  return (
    <Tag className={`${classes.status} ${className}`}>
      <span></span>
      {children}
    </Tag>
  );
};
