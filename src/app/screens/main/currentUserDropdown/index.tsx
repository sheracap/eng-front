import React, { FC, memo } from "react";

import { CurrentUserModel } from "#businessLogic/models/account";
import { StoreTypeWithData } from "#core/effector/types/store";
import { useLogOut } from "#hooks/useLogOut";
import { UserAvatarSvgIcon, UserDropdownArrowSvgIcon } from "#svgIcons/index";
import { ModalConfirmUI } from "#ui/modalConfirm";
import { Popover, Spin } from "antd";

import { useStyles } from "./styles";

type PropsType = {
  currentUserState: StoreTypeWithData<CurrentUserModel>;
};

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

export const CurrentUserDropdown: FC<PropsType> = memo((props) => {
  const { currentUserState } = props;
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
