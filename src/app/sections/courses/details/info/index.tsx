import React, { FC, useEffect } from "react";
import { ButtonUI } from "#ui/button";
import { ModalUI } from "#ui/modal";
import { AddCourseModal, AddCourseModalType } from "#src/app/sections/courses/my/addModal";
import { CourseDetailsModel } from "#businessLogic/models/courses";
import { useModalControl } from "#hooks/useModalControl";
import { CourseDetailsChapters } from "./chapters";
import { DeleteIcon, EditSvgIcon } from "#src/assets/svg";
import { imagesBaseUrl, ROUTES } from "#constants/index";
import { BackBtn } from "#ui/backBtn";
import { useHistory } from "react-router-dom";
import { ContentUI } from "#ui/content";
import { Popconfirm } from "antd";
import { useStore } from "effector-react";
import { $deleteCourse } from "#stores/courses";
import { $currentUser } from "#stores/account";
import { notificationSuccess } from "#ui/notifications";

type PropsTypes = {
  data: CourseDetailsModel;
  getDetails: () => void;
}

export const CourseDetailsInfo: FC<PropsTypes> = (props) => {
  const { data, getDetails } = props;

  const history = useHistory();

  const { data: currentUserData } = useStore($currentUser.store);
  const deleteCourseState = useStore($deleteCourse.store);

  const updateCourseModalControl = useModalControl<AddCourseModalType>();

  useEffect(() => {
    if (deleteCourseState.data) {
      notificationSuccess("Курс удален", "");
      $deleteCourse.reset();
      history.push(`${ROUTES.COURSES}/my`);
    }
  }, [deleteCourseState.data]);

  const onDelete = (id: number) => {
    $deleteCourse.effect(id);
  }

  const isMine = currentUserData?.id === data.userId;

  return (
    <ContentUI>
      <div className="main-content">
        <div className="course-details">
          <div className="course-details__head content-block">
            <div>
              <div className="course-details__head__name">
                <BackBtn onBackClick={() => history.goBack()} />
                {data.name}
              </div>
              <div className="course-details__head__desc">
                {data.img && (
                  <div className="course-details__head__img">
                    <img src={`${imagesBaseUrl}/courses/${data.img}`} alt="" />
                  </div>
                )}
                <div>{data.description}</div>
              </div>
            </div>
            {isMine && (
              <div className="course-details__head__actions">
                <ButtonUI
                  type="primary"
                  withIcon
                  onClick={() => updateCourseModalControl.openModal({ id: data.id })}
                >
                  <EditSvgIcon /> Редактировать
                </ButtonUI>
                <Popconfirm
                  title="Вы уверены, что хотите удалить урок ?"
                  onConfirm={() => {
                    onDelete(data.id)
                  }}
                  okText="Да"
                  cancelText="Нет"
                >
                  <ButtonUI
                    danger
                    withIcon
                    loading={deleteCourseState.loading}
                  >
                    <DeleteIcon /> Удалить
                  </ButtonUI>
                </Popconfirm>
              </div>
            )}
          </div>

          <CourseDetailsChapters courseId={data.id} isMine={isMine} isPrivate={data.isPrivate} />

        </div>

        <ModalUI
          open={updateCourseModalControl.modalProps.open}
          onCancel={updateCourseModalControl.closeModal}
        >
          <AddCourseModal modalControl={updateCourseModalControl} callback={getDetails} />
        </ModalUI>
      </div>
    </ContentUI>
  )
};