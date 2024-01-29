import React, { useEffect } from "react";
import { useStore } from "effector-react";
import { $studentsList } from "#stores/students";
import { useHistory } from "react-router-dom";
import { ButtonUI } from "#ui/button";
import { useModalControl } from "#hooks/useModalControl";
import { ModalUI } from "#ui/modal";
import { InviteStudentModal } from "./inviteModal";

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

  return (
    <div>
      <div className="folder-head">
        <h2>Мои ученики</h2>
        <ButtonUI type="primary" onClick={() => inviteStudentModalControl.openModal()}>Пригласить ученика</ButtonUI>
      </div>
      <div className="myStudents">
        {studentsListState.data.rows.map((item) => (
          <div className="myStudents__item" key={item.id}>
            <div className="myStudents__item__name">
              {item.name}
            </div>
            <div className="myStudents__item__email">
              {item.email}
            </div>
          </div>
        ))}
      </div>
      <ModalUI
        open={inviteStudentModalControl.modalProps.open}
        onCancel={inviteStudentModalControl.closeModal}
      >
        <InviteStudentModal modalControl={inviteStudentModalControl} />
      </ModalUI>
    </div>
  )
};