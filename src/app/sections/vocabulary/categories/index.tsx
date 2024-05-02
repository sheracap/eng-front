import React, { useEffect } from "react";
import { useStore } from "effector-react";
import { $wordCategories, $deleteWordCategory } from "#stores/words";
import { AddPlusSvgIcon, TrashSvgIcon } from "#src/assets/svg";
import { ButtonUI } from "#ui/button";
import { notificationSuccess } from "#ui/notifications";
import { useModalControl } from "#hooks/useModalControl";
import { ModalUI } from "#ui/modal";
import { AddWordCategoryModal } from "./addCategoryModal";

export const WordCategories = () => {

  const wordCategoriesState = useStore($wordCategories.store);
  const deleteWordCategoryState = useStore($deleteWordCategory.store);

  const addWordCategoryModalControl = useModalControl();

  useEffect(() => {
    if (wordCategoriesState.data.length === 0) {
      $wordCategories.effect();
    }
  }, []);

  useEffect(() => {
    if (deleteWordCategoryState.data) {
      const newList = wordCategoriesState.data.filter((item) => item.id !== deleteWordCategoryState.data);

      $wordCategories.update({
        ...deleteWordCategoryState,
        data: newList
      });

      notificationSuccess("Категория удалена", "");

      $deleteWordCategory.reset();
    }
  }, [deleteWordCategoryState.data]);

  const afterAdd = (item: { id: number; name: string; }) => {
    $wordCategories.update({
      ...wordCategoriesState,
      data: [item, ...wordCategoriesState.data]
    });
  }

  const onDeleteCategory = (id: number) => {
    $deleteWordCategory.effect(id);
  }

  return (
    <div className="words__categories">
      <div>
        <div>Категории</div>
        <ButtonUI
          type="primary"
          withIcon
          size="small"
          onClick={() => addWordCategoryModalControl.openModal()}
        >
          <AddPlusSvgIcon /> Добавить
        </ButtonUI>
      </div>

      {wordCategoriesState.data.map((item) => (
        <div className="words__categories__item" key={item.id}>
          {item.name}
          <ButtonUI
            onClick={() => onDeleteCategory(item.id)}
          >
            <TrashSvgIcon />
          </ButtonUI>
        </div>
      ))}

      <ModalUI
        open={addWordCategoryModalControl.modalProps.open}
        onCancel={addWordCategoryModalControl.closeModal}
      >
        <AddWordCategoryModal modalControl={addWordCategoryModalControl} callback={afterAdd} />
      </ModalUI>
    </div>
  )
}