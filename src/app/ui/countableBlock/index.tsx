import React from "react";

import { Spin } from "antd";

import { useStyles } from "./styles";

const CountableBlock = (props) => {
  const { title, children, loading } = props;
  const classes = useStyles();

  return (
    <div className={classes.countableWrapper}>
      <span>{title}:</span>
      {loading ? <Spin size="small" /> : children}
    </div>
  );
};

const Wrapper = (props) => {
  const { children } = props;
  const classes = useStyles();

  return <div className={classes.countableWrapper}>{children}</div>;
};

CountableBlock.Wrapper = Wrapper;

export { CountableBlock };
