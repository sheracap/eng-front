import React from "react";

import { ArrowBackSvgIcon } from "#svgIcons/index";
import { Button } from "antd";
import { History } from "history";

import { useStyles } from "./styles";

type BackBtnPropTypes = {
  history?: History;
  backPath?: string;
  onBackClick?: () => void;
};

export const BackBtn: React.FC<BackBtnPropTypes> = (props) => {
  const { history, backPath, onBackClick } = props;
  const classes = useStyles();

  const onClick = () => {
    if (history) {
      if (backPath) {
        history.push(backPath);
      } else {
        history.goBack();
      }
    }
  };

  return (
    <Button
      className={classes.backBtn}
      type="ghost"
      shape="circle"
      icon={<ArrowBackSvgIcon />}
      onClick={onBackClick || onClick}
    />
  );
};
