import React, { useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useStore } from "effector-react";

import { ColumnsType } from "antd/lib/table/interface";

import { $studentsList } from "#stores/students";

import { ButtonUI } from "#ui/button";
import { ModalUI } from "#ui/modal";
import { TableUI } from "#ui/table";

import { useModalControl } from "#hooks/useModalControl";

import { InviteStudentModal } from "./inviteModal";
import { StudentsListItemModel } from "#businessLogic/models/students";


export const MyStudents = () => {

  const history = useHistory();

  const studentsListState = useStore($studentsList.store);

  const inviteStudentModalControl = useModalControl();

  const getList = () => {
    $studentsList.effect();
  };

  useEffect(() => {
    getList();
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
      }
    ];

    return columns;
  }, []);

  const onChangePagination = () => {

  };

  return (
    <div>
      <div className="folder-head content-block">
        <h1>Мои ученики</h1>
        <ButtonUI type="primary" onClick={() => inviteStudentModalControl.openModal()}>Пригласить ученика</ButtonUI>
      </div>
      <TableUI
        dataSource={studentsListState.data.rows}
        columns={tableColumns}
        pagination={{
          total: studentsListState.data.count,
          pageSize: 10,
          current: 1,
          hideOnSinglePage: true,
          onChange: onChangePagination,
        }}

      />
      <ModalUI
        open={inviteStudentModalControl.modalProps.open}
        onCancel={inviteStudentModalControl.closeModal}
      >
        <InviteStudentModal modalControl={inviteStudentModalControl} />
      </ModalUI>
    </div>
  )
};