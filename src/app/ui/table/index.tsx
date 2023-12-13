import React, { FC } from "react";

import { Table, TableProps } from "antd";

import { useStyles } from "./styles";

export const TableUI: FC<TableProps<any>> = (props) => {
  const classes = useStyles();

  return (
    <Table
      rowKey={"id"}
      className={classes.tableWr}
      pagination={{
        pageSizeOptions: [5, 10, 20],
        ...props.pagination,
      }}
      {...props}
    />
  );
};
