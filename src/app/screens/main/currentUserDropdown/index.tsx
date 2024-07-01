import React, { FC, memo } from "react";

import { useLogOut } from "#hooks/useLogOut";
import { UserAvatarSvgIcon } from "#svgIcons/index";
import { ModalConfirmUI } from "#ui/modalConfirm";
import { Popover, Spin } from "antd";

import { useStyles } from "./styles";
import { useStore } from "effector-react";
import { $currentUser } from "#stores/account";
import { UserEditModal } from "./userEditModal";
import { ModalUI } from "#ui/modal";
import { useModalControl } from "#hooks/useModalControl";
import { imagesBaseUrl } from "#constants/index";

export const CurrentUserDropdown: FC = memo((props) => {

  const currentUserState = useStore($currentUser.store);

  const { loading: currentUserLoading, data: currentUserData } = currentUserState;

  const classes = useStyles();

  const logOut = useLogOut();

  const userEditModalControl = useModalControl();

  const renderUserDetails = () => {
    if (currentUserLoading) {
      return (
        <div>
          <Spin />
        </div>
      );
    } else if (currentUserData) {
      return (
        <div>
          <div className={classes.userName}>
            {currentUserData.name ? currentUserData.name : "Пользователь"}
          </div>
        </div>
      );
    }
  };

  return (
    <div className={classes.userBlockWr}>
      <Popover
        overlayClassName={classes.popoverWrap}
        placement="bottomRight"
        content={(
          <div className={classes.dropdown}>
            <div className={classes.dropdownItem} onClick={() => userEditModalControl.openModal()}>
              Редактировать профиль
            </div>
            <ModalConfirmUI title="Вы точно хотите выйти из профиля ?" onOk={logOut}>
              <div className={classes.dropdownItem}>Выйти из профиля</div>
            </ModalConfirmUI>
          </div>
        )}
        trigger="click"
      >
        <div className={classes.userRow}>
          <div className={classes.userPhoto}>
            <div className={classes.userPhotoPlaceholder}>
              {currentUserData?.img ? (
                <img src={`${imagesBaseUrl}/avatars/${currentUserData.img}`} alt="" />
              ) : (
                <UserAvatarSvgIcon />
              )}
            </div>
          </div>
          <div className={classes.userDetails}>{renderUserDetails()}</div>
        </div>
      </Popover>
      <ModalUI
        open={userEditModalControl.modalProps.open}
        onCancel={userEditModalControl.closeModal}
      >
        <UserEditModal modalControl={userEditModalControl} />
      </ModalUI>
    </div>
  );
});
