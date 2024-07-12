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
import { useRole } from "#hooks/useRole";
import { parseParams } from "#hooks/useQueryParams";


export const HomeworkList: FC = () => {

  const queryParams = parseParams(location.search, false);

  const homeworkAssignmentsState = useStore($homeworkAssignments.store);

  const { isTeacher } = useRole();

  const getList = () => {
    const params = {};

    if (isTeacher && queryParams.studentId) {
      params["studentId"] = queryParams.studentId;
    }

    $homeworkAssignments.effect(params);
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
          <Link
            to={isTeacher && queryParams.studentId ? `${ROUTES.HOMEWORK}/${item.homework.id}?studentId=${queryParams.studentId}` : `${ROUTES.HOMEWORK}/${item.homework.id}`}
          >
            {item.homework.name}
          </Link>
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
