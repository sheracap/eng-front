import React, { FC } from "react";

import { SelectUIPropTypes } from "#types/components";
import { SelectUI } from "#ui/select";

export const LevelSelect: FC<SelectUIPropTypes> = (props) => {


  return (
    <SelectUI allowClear={false} placeholder="Выберите уровень" {...props}>
      <SelectUI.Option value={"a1"}>
        A1 - Начальный
      </SelectUI.Option>
      <SelectUI.Option value={"a2"}>
        A2 - Ниже среднего
      </SelectUI.Option>
      <SelectUI.Option value={"b1"}>
        B1 - Средний
      </SelectUI.Option>
      <SelectUI.Option value={"b2"}>
        B2 - Выше среднего
      </SelectUI.Option>
      <SelectUI.Option value={"c1"}>
        C1 - Продвинутый
      </SelectUI.Option>
      <SelectUI.Option value={"c2"}>
        C2 - Профессиональный уровень владения
      </SelectUI.Option>
    </SelectUI>
  );
};
