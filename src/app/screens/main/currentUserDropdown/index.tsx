import React, { FC, memo } from "react";

import { useLogOut } from "#hooks/useLogOut";
import { UserAvatarSvgIcon, UserDropdownArrowSvgIcon } from "#svgIcons/index";
import { ModalConfirmUI } from "#ui/modalConfirm";
import { Popover, Spin } from "antd";

import { useStyles } from "./styles";
import { useStore } from "effector-react";
import { $currentUser } from "#stores/account";

const DropdownMenu = memo(() => {
  const classes = useStyles();
  const logOut = useLogOut();

  return (
    <div className={classes.dropdown}>
      <ModalConfirmUI title="Вы точно хотите выйти из профиля ?" onOk={logOut}>
        <div className={classes.dropdownItem}>Выйти из профиля</div>
      </ModalConfirmUI>
    </div>
  );
});

export const CurrentUserDropdown: FC = memo((props) => {

  const currentUserState = useStore($currentUser.store);

  const { loading: currentUserLoading, data: currentUserData } = currentUserState;

  const classes = useStyles();

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
        content={<DropdownMenu />}
        trigger="click"
      >
        <div className={classes.userRow}>
          <div className={classes.userPhoto}>
            <div className={classes.userPhotoPlaceholder}>
              <UserAvatarSvgIcon />
            </div>
          </div>
          <div className={classes.userDetails}>{renderUserDetails()}</div>
          <div className={classes.userRight}>
            <UserDropdownArrowSvgIcon />
          </div>
        </div>
      </Popover>
    </div>
  );
});
