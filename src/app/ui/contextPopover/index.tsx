import React from "react";

import { ContextMenuDotsSvgIcon } from "#src/assets/svg";
import { Button, Popover } from "antd";

import "./styles.scss";

export const ContextPopover: React.FC<any> = (props) => {
  const { content, ...restProps } = props;

  return (
    <Popover
      overlayClassName="custom-popover"
      placement="left"
      content={<div>{content}</div>}
      trigger="click"
      {...restProps}
    >
      <Button className="custom-popover__button">
        <ContextMenuDotsSvgIcon />
      </Button>
    </Popover>
  );
};
