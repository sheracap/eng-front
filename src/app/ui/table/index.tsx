import React, { FC } from "react";

import { Table, TableProps } from "antd";



export const TableUI: FC<TableProps<any>> = (props) => {

  return (
    <Table
      rowKey="id"
      //className={classes.tableWr}
      {...props}
    />
  );
};
