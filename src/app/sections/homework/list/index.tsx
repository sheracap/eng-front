import React, { FC, useEffect, useMemo } from "react";
import { useStore } from "effector-react";

import { ColumnsType } from "antd/lib/table/interface";

import { $homeworkAssignments } from "#stores/homework";

import { TableUI } from "#ui/table";

import { formatDate } from "#utils/formatters";
import { StatusUI } from "#ui/status";
import { ContentUI } from "#ui/content";
import { ROUTES } from "#constants/index";
import { Link } from "react-router-dom";


export const HomeworkList: FC = () => {

  const homeworkAssignmentsState = useStore($homeworkAssignments.store);

  const getList = () => {
    $homeworkAssignments.effect({});
  };

  useEffect(() => {
    getList();
  }, []);


  const tableColumns = useMemo(() => {
    const columns: ColumnsType<any> = [
      {
        title: "Название",
        dataIndex: "homework",
        render: (_, item) => (
          <Link to={`${ROUTES.HOMEWORK}/${item.homework.id}`}>{item.homework.name}</Link>
        ),
      },
      {
        title: "Дата",
        dataIndex: "createdAt",
        render: (_, item) => formatDate(item.createdAt),
      },
      {
        title: "Статус",
        dataIndex: "status",
        render: (_, item) => {

          return (
            <StatusUI status={item.status}>
              {item.status === "assigned" ? "В процессе" : "Выполнено"}
            </StatusUI>
          )
        },
      },
    ];

    return columns;
  }, []);

  const onChangePagination = () => {

  };

  return (
    <ContentUI>
      <div className="folder-head content-block">
        <h1>Домашнее задание</h1>
      </div>
      <TableUI
        loading={homeworkAssignmentsState.loading}
        dataSource={homeworkAssignmentsState.data.rows}
        columns={tableColumns}
        pagination={{
          total: homeworkAssignmentsState.data.count,
          pageSize: 10,
          current: 1,
          hideOnSinglePage: true,
          onChange: onChangePagination,
        }}
      />
    </ContentUI>
  )
};
