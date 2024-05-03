import React, { FC, ReactNode } from "react";

import { Drawer } from "antd";

import { useStyles } from "./styles";

interface DrawerPropTypes {
  children: ReactNode;
  afterClose?: () => void;
  withoutInner?: boolean;
}

export const DrawerModalUI: FC<DrawerPropTypes & any> = (props) => {
  const { children, className, withoutInner, afterClose, ...restProps } = props;
  const classes = useStyles();

  const afterOpenChange = (open) => {
    if (!open && afterClose) {
      afterClose();
    }
  };

  return (
    <Drawer
      className={`${classes.drawer} ${className}`}
      width={580}
      closable={false}
      destroyOnClose={true}
      afterOpenChange={afterClose ? afterOpenChange : restProps.afterOpenChange}
      {...restProps}
    >
      {withoutInner ? <>{children}</> : <div className={classes.drawerInner}>{children}</div>}
    </Drawer>
  );
};
