import React, { ReactNode } from "react";

import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  ldsDualRing: {
    display: "inline-block",
    width: "80px",
    height: "80px",

    "&:after": {
      content: '" "',
      display: "block",
      width: "64px",
      height: "64px",
      margin: "8px",
      borderRadius: "50%",
      border: "6px solid #353A63",
      borderColor: "#353A63 transparent #353A63 transparent",
      animation: "$ldsDualRing 1.2s linear infinite",
    },
  },
  "@keyframes ldsDualRing": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
});

type PropsType = {
  size?: string;
  height?: number;
  children?: ReactNode;
  spinning?: boolean;
};

const getFontSize = (size?: string) => {
  if (size === "small") {
    return 32;
  } else if (size === "large") {
    return 56;
  } else {
    return 46;
  }
};

export const Spinner: React.FC<PropsType> = (props) => {
  const { size, height, ...restProps } = props;

  const antIcon = <LoadingOutlined style={{ fontSize: height ? height : getFontSize(size) }} spin />;

  return <Spin indicator={antIcon} {...restProps} />;
};
