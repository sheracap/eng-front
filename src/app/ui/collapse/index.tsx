import React, { FC } from "react";
import { Collapse, CollapsePanelProps, CollapseProps } from "antd";

const { Panel } = Collapse;

import "./styles.scss";

type ContentType = FC<CollapseProps> & {
  Item: typeof Item;
};

const CollapseUI: ContentType = (props) => {
  const { children, ...restProps } = props;

  return (
    <Collapse className="custom-collapse" ghost {...restProps}>
      {children}
    </Collapse>
  )
};

const Item: FC<CollapsePanelProps> = (props) => {
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