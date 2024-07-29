import React, { FC, useEffect } from "react";
import { useStore } from "effector-react";

import { $wordCategories } from "#stores/words";

import { SelectUIPropTypes } from "#types/components";
import { SelectUI } from "#ui/select";

export const WordCategorySelect: FC<SelectUIPropTypes> = (props) => {
  const wordCategoriesState = useStore($wordCategories.store);

  useEffect(() => {
    if (!wordCategoriesState.data.length) {
      $wordCategories.effect();
    }
  }, []);

  return (
    <SelectUI
      placeholder="Выберите категорию"
      loading={wordCategoriesState.loading}
      {...props}
    >
      {wordCategoriesState.data.map((item) => (
        <SelectUI.Option value={item.id}>
          {item.name}
        </SelectUI.Option>
      ))}
    </SelectUI>
  );
};
