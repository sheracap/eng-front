import React, { FC } from "react";

import { SelectUIPropTypes } from "#types/components";
import { SelectUI } from "#ui/select";

export const LanguageSelect: FC<SelectUIPropTypes> = (props) => {

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
