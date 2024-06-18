import React, { FC, useEffect, useMemo, useState } from "react";
import { $studentsForLessonList } from "#stores/students";
import { useStore } from "effector-react";
import { TableUI } from "#ui/table";
import { ColumnsType } from "antd/lib/table/interface";
import { StudentsListItemModel } from "#businessLogic/models/students";
import { $selectedStudents } from "#src/app/screens/main/effector";

export const StartLessonStudentsTab: FC = () => {

  const studentsForLessonListState = useStore($studentsForLessonList.store);
  const [selectedStudentsIds, setSelectedStudentsIds] = useState([]);

  useEffect(() => {
    $studentsForLessonList.effect();
  }, []);

  const tableColumns = useMemo(() => {
    const columns: ColumnsType<StudentsListItemModel> = [
      {
        title: "Имя",
        dataIndex: "name",
        render: (_, item) => item.name,
      },
      {
        title: "Email",
        dataIndex: "email",
        render: (_, item) => item.email,
      },
    ];

    return columns;
  }, []);

  const onChangePagination = () => {

  };

  const onRowSelect = (ids, items) => {
    setSelectedStudentsIds(ids);
    $selectedStudents.update(items);
  };

  return (
    <div>
      <TableUI
        rowSelection={{
          type: "checkbox",
          selectedRowKeys: selectedStudentsIds,
          onChange: onRowSelect,
        }}
        loading={studentsForLessonListState.loading}
        dataSource={studentsForLessonListState.data.rows}
        columns={tableColumns}
        pagination={{
          total: studentsForLessonListState.data.count,
          pageSize: 10,
          current: 1,
          hideOnSinglePage: true,
          onChange: onChangePagination,
        }}
      />
    </div>
  )
}