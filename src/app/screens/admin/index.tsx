import React, { useEffect } from "react";
import { $currentUser } from "#stores/account";
import { useStore } from "effector-react";
import { Spinner } from "#ui/spinner";

import "./styles.scss";
import { ButtonUI } from "#ui/button";
import { AddCourseModal, AddCourseModalType } from "#src/app/sections/courses/my/addModal";
import { ModalUI } from "#ui/modal";
import { useModalControl } from "#hooks/useModalControl";
import { AddLessonModal, AddLessonModalPropTypes } from "#src/app/sections/lessons/my/addModal";
import { ROUTES } from "#constants/index";
import { useHistory } from "react-router-dom";

export const AdminPage = () => {

  const history = useHistory();

  const currentUserState = useStore($currentUser.store);

  const { data: currentUser } = currentUserState;

  const addCourseModalControl = useModalControl<AddCourseModalType>();
  const addLessonModalControl = useModalControl<AddLessonModalPropTypes>();

  useEffect(() => {
    $currentUser.effect();

    return () => {
      $currentUser.reset();
    };
  }, []);

  if (!currentUser) {
    return (
      <div className="site-wrapper__spinner">
        <Spinner />
      </div>
    );
  }

  if (currentUser.id !== 1) {
    return (
      <div>
        No permission !
      </div>
    )
  }

  return (
    <div className="admin-wrap">
      <ButtonUI onClick={() => addCourseModalControl.openModal({ isPrivate: false })}>Создать курс</ButtonUI>
      <ButtonUI onClick={() => addLessonModalControl.openModal({ isPrivate: false })}>Создать урок</ButtonUI>
      <div>Создать тексты для чтения</div>

      <ModalUI
        open={addCourseModalControl.modalProps.open}
        onCancel={addCourseModalControl.closeModal}
      >
        <AddCourseModal modalControl={addCourseModalControl} callback={() => {}} />
      </ModalUI>

      <ModalUI
        open={addLessonModalControl.modalProps.open}
        onCancel={addLessonModalControl.closeModal}
      >
        <AddLessonModal
          modalControl={addLessonModalControl}
          afterAdd={(item) => {
            history.push(`${ROUTES.LESSONS}/${item.id}/1`);
          }}
          afterUpdate={() => {

          }}
        />
      </ModalUI>
    </div>
  )
}