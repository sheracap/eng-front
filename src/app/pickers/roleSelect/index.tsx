import React, { FC, useEffect } from "react";

import { $roles } from "#stores/common";
import { SelectUIPropTypes } from "#types/components";
import { SelectUI } from "#ui/select";
import { useStore } from "effector-react";

export const RoleSelect: FC<SelectUIPropTypes> = (props) => {
  const rolesState = useStore($roles.store);

  useEffect(() => {
    if (!rolesState.data.length) {
      $roles.effect();
    }
  }, []);

  return (
    <SelectUI loading={rolesState.loading} allowClear={true} placeholder="Выберите роль" {...props}>
      {rolesState.data.map((item) => (
        <SelectUI.Option value={item.id} key={item.id}>
          {item.name}
        </SelectUI.Option>
      ))}
    </SelectUI>
  );
};
