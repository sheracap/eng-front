import React from "react";

import { ContextMenuDotsSvgIcon } from "#src/assets/svg";
import { Button, Popover } from "antd";

import { useStyles } from "./styles";

export const ContextPopover: React.FC<any> = (props) => {
  const { content, ...restProps } = props;
  const classes = useStyles(props);

  return (
    <Popover
      overlayClassName={classes.popover}
      placement="left"
      content={<div>{content}</div>}
      trigger="click"
      {...restProps}
    >
      <Button className={classes.button}>
        <ContextMenuDotsSvgIcon />
      </Button>
    </Popover>
  );
};
