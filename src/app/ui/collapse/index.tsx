import React from "react";
import { Collapse } from "antd";

const { Panel } = Collapse;

import "./styles.scss";

const CollapseUI = (props) => {
  const { children, ...restProps } = props;

  return (
    <Collapse className="custom-collapse" ghost {...restProps}>
      {children}
    </Collapse>
  )
};

const Item = (props) => {
  const { children, ...restProps } = props;

  return (
    <Panel {...restProps}>
      {children}
    </Panel>
  )
};

CollapseUI.Item = Item;

export {
  CollapseUI
}