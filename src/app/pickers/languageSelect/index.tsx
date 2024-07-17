import React, { FC, useEffect } from "react";

import { $roles } from "#stores/common";
import { SelectUIPropTypes } from "#types/components";
import { SelectUI } from "#ui/select";
import { useStore } from "effector-react";

export const LanguageSelect: FC<SelectUIPropTypes> = (props) => {
  const rolesState = useStore($roles.store);

  useEffect(() => {
    if (!rolesState.data.length) {
      $roles.effect();
    }
  }, []);

  return (
    <SelectUI allowClear={false} placeholder="Выберите язык" {...props}>
      <SelectUI.Option value={"ENGLISH"}>
        Английский
      </SelectUI.Option>
      <SelectUI.Option value={"KOREAN"}>
        Корейский
      </SelectUI.Option>
    </SelectUI>
  );
};
