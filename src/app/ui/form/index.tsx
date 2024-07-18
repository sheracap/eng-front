import React, { FC } from "react";

import { Button, Col, Form, Row } from "antd";
import { ColProps } from "antd/lib/col";
import { FormItemProps } from "antd/lib/form";
import { RowProps } from "antd/lib/row";

import { useStyles } from "./styles";

const FormUI = (props: any) => {
  const { phantomSubmit = false, children, ...restProps } = props;
  const classes = useStyles();

  return (
    <Form className={classes.form} layout={"vertical"} autoComplete="off" {...restProps}>
      {children}
      {phantomSubmit && (
        <div style={{ width: 0, height: 0, overflow: "hidden" }}>
          <Button htmlType="submit">Save</Button>
        </div>
      )}
    </Form>
  );
};

const Item: FC<FormItemProps> = (props) => {
  return <Form.Item {...props} />;
};

const ItemRow: FC<RowProps> = (props) => {
  return <Row gutter={[20, 0]} {...props} />;
};

const ItemCol: FC<ColProps> = (props) => {
  return <Col span={12} {...props} />;
};

FormUI.Item = Item;
FormUI.Row = ItemRow;
FormUI.Col = ItemCol;

export { FormUI };
