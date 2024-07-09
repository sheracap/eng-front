import React, { FC, useEffect, useMemo } from "react";
import { useStore } from "effector-react";
import { Popconfirm } from "antd";

import { ColumnsType } from "antd/lib/table/interface";

import { $deleteStudent, $studentsList } from "#stores/students";

import { ButtonUI } from "#ui/button";
import { ModalUI } from "#ui/modal";
import { TableUI } from "#ui/table";

import { useModalControl } from "#hooks/useModalControl";

import { InviteStudentModal } from "./inviteModal";
import { StudentsListItemModel } from "#businessLogic/models/students";
import { AddPlusSvgIcon } from "#src/assets/svg";
import { notificationSuccess } from "#ui/notifications";

import "./styles.scss";
import { ContentUI } from "#ui/content";

export const MyStudents: FC = () => {

  const studentsListState = useStore($studentsList.store);
  const deleteStudentState = useStore($deleteStudent.store);

  const inviteStudentModalControl = useModalControl();

  const getList = () => {
    $studentsList.effect();
  };

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    if (deleteStudentState.success) {
      notificationSuccess("Ученик удален", "");
      $deleteStudent.reset();
      getList();
    }
  }, [deleteStudentState.success]);

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
      {
        title: "",
        dataIndex: "remove",
        width: 150,
        render: (_, item) => (
          <Popconfirm
            title="Вы уверены, что хотите удалить ученика ?"
            onConfirm={() => deleteStudent(item.id)}
            okText="Да"
            cancelText="Нет"
          >
            <ButtonUI danger>Удалить</ButtonUI>
          </Popconfirm>
        ),
      }
    ];

    return columns;
  }, []);

  const deleteStudent = (id: number) => {
    $deleteStudent.effect(id);
  }

  const onChangePagination = () => {

  };

  return (
    <ContentUI>
      <div className="main-content">
        <div>
          <div className="folder-head content-block">
            <h1>Мои ученики ({studentsListState.data.count})</h1>
            <ButtonUI
              type="primary"
              withIcon
              onClick={() => inviteStudentModalControl.openModal()}
            >
              <AddPlusSvgIcon /> Пригласить ученика
            </ButtonUI>
          </div>
          <TableUI
            loading={studentsListState.loading || deleteStudentState.loading}
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
      </div>
    </ContentUI>
  )
};
