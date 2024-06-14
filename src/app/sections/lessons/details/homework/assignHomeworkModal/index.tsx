import React, { FC, useEffect, useMemo, useState } from "react";

import { ModalControlType } from "#hooks/useModalControl";
import { $assignHomework } from "#stores/homework";
import { ButtonUI } from "#ui/button";
import { ModalUI } from "#ui/modal";
import { useStore } from "effector-react";

import { notificationSuccess, notificationWarning } from "#ui/notifications";
import { TableUI } from "#ui/table";
import { $studentsForLessonList } from "#stores/students";
import { ColumnsType } from "antd/lib/table/interface";
import { StudentsListItemModel } from "#businessLogic/models/students";

export type AssignHomeworkModalPropTypes = {
  homeworkId: any;
}

type PropTypes = {
  modalControl: ModalControlType<AssignHomeworkModalPropTypes>;
};

export const AssignHomeworkModal: FC<PropTypes> = (props) => {
  const { modalControl } = props;

  const studentsForLessonListState = useStore($studentsForLessonList.store);
  const assignHomeworkState = useStore($assignHomework.store);

  const [selectedStudents, setSelectedStudents] = useState([]);

  useEffect(() => {
    $studentsForLessonList.effect();

    return () => {
      $assignHomework.reset();
    };
  }, []);

  useEffect(() => {
    if (assignHomeworkState.success) {
      notificationSuccess("Домашнее задание выставлено", "");
      modalControl.closeModal();
    }
  }, [assignHomeworkState.success]);

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

  const onCancelClick = () => {
    modalControl.closeModal();
  };

  const onChangePagination = () => {

  };

  const onRowSelect = (ids) => {
    setSelectedStudents(ids);
  };

  const onFinish = () => {
    if (!selectedStudents.length) {
      notificationWarning("Выберите учеников", "");
      return;
    }

    $assignHomework.effect({
      homeworkId: modalControl.modalProps.homeworkId,
      studentIds: selectedStudents
    });
  };

  return (
    <>
      <ModalUI.Loading show={assignHomeworkState.loading} />
      <ModalUI.Header>
        <ModalUI.Title>Домашнее задание</ModalUI.Title>
      </ModalUI.Header>
      <ModalUI.Middle>
        <TableUI
          rowSelection={{
            type: "checkbox",
            selectedRowKeys: selectedStudents,
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
      </ModalUI.Middle>
      <ModalUI.Footer>
        <ModalUI.Buttons>
          <ModalUI.Buttons.Col>
            <ButtonUI type="secondary" onClick={onCancelClick}>
              Отмена
            </ButtonUI>
          </ModalUI.Buttons.Col>
          <ModalUI.Buttons.Col>
            <ButtonUI type="primary" onClick={onFinish}>
              Выставить
            </ButtonUI>
          </ModalUI.Buttons.Col>
        </ModalUI.Buttons>
      </ModalUI.Footer>
    </>
  );
};
