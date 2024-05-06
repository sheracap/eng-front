import React, { useEffect } from "react";
import { useStore } from "effector-react";
import { $wordCategories, $deleteWordCategory } from "#stores/words";
import { AddPlusSvgIcon, DeleteIcon, EditSvgIcon, TrashSvgIcon } from "#src/assets/svg";
import { ButtonUI } from "#ui/button";
import { notificationSuccess } from "#ui/notifications";
import { useModalControl } from "#hooks/useModalControl";
import { ModalUI } from "#ui/modal";
import { AddWordCategoryModal } from "./addCategoryModal";
import { WordCategoryItemModel } from "#businessLogic/models/vocabulary";
import { Popconfirm } from "antd";
import { $deleteExercise } from "#stores/exercise";
import { ContextPopover } from "#ui/contextPopover";

export const WordCategories = (props) => {
  const { selectedCategory, setSelectedCategory } = props;

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
      // deleteWordCategoryState.data check type of id

      $wordCategories.update({
        ...deleteWordCategoryState,
        data: newList
      });

      notificationSuccess("Категория удалена", "");

      $deleteWordCategory.reset();
    }
  }, [deleteWordCategoryState.data]);

  const afterAdd = (item: WordCategoryItemModel) => {
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
      <div className="words__categories__head">
        <div>Категории</div>
        <ButtonUI
          type="primary"
          withIcon
          size="small"
          onClick={() => addWordCategoryModalControl.openModal()}
        >
          <AddPlusSvgIcon />
        </ButtonUI>
      </div>
      <div className={`words__categories__item ${!selectedCategory ? "active" : ""}`}>
        <div
          className="words__categories__item__name"
          onClick={() => setSelectedCategory(undefined)}
        >
          Все
        </div>
        <div className="words__categories__item__actions" />
      </div>
      {wordCategoriesState.data.map((item) => (
        <div
          className={`words__categories__item ${selectedCategory?.id === item.id ? "active" : ""}`}
          key={item.id}
        >
          <div
            className="words__categories__item__name"
            onClick={() => setSelectedCategory({ id: item.id, name: item.name })}
          >
            {item.name}
          </div>
          <div className="words__categories__item__actions">
            <ContextPopover
              placement="right"
              content={(
                <>
                  <div className="custom__popover__item">
                    <ButtonUI
                      withIcon
                    >
                      <EditSvgIcon /> Редактировать
                    </ButtonUI>
                  </div>
                  <div className="custom__popover__item">
                    <Popconfirm
                      title="Вы уверены, что хотите удалить упражнение ?"
                      onConfirm={() => onDeleteCategory(item.id)}
                      okText="Да"
                      cancelText="Нет"
                    >
                      <ButtonUI
                        danger
                        withIcon
                        //loading={deleteExerciseState.loading}
                      >
                        <DeleteIcon /> Удалить
                      </ButtonUI>
                    </Popconfirm>
                  </div>
                </>
              )}
            />
          </div>
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