import React, { FC, useEffect, useState } from "react";
import { Pagination } from "antd";
import { useStore } from "effector-react";

import { $wordsList } from "#stores/words";

import { ContentUI } from "#ui/content";
import { ButtonUI } from "#ui/button";

import { AddPlusSvgIcon } from "#src/assets/svg";

import { useModalControl } from "#hooks/useModalControl";
import { ModalUI } from "#ui/modal";
import { WordItemModel } from "#businessLogic/models/vocabulary";

import { AddWordModal, AddWordModalPropsTypes, myCurrentLang } from "./addWordModal";
import { WordCategories } from "./categories";
import { SelectExerciseTypeModal } from "./selectExerciseTypeModal";
import { WordExercisesModal, WordExercisesModalType } from "./wordExercisesModal";

import "./styles.scss";
import { Spinner } from "#ui/spinner";

const pageSize = 20;

export const Vocabulary: FC = () => {

  const wordsListState = useStore($wordsList.store);

  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<undefined | { id: number; name: string; }>(undefined);

  const addWordModalControl = useModalControl<AddWordModalPropsTypes>();
  const selectExerciseTypeModalControl = useModalControl();
  const wordExercisesModalControl = useModalControl<WordExercisesModalType>();

  useEffect(() => {
    $wordsList.effect({
      page,
      wordCategoryId: selectedCategory?.id,
    });
  }, [page, selectedCategory]);


  const addForListNewItem = (item) => {
    const newList = [item, ...wordsListState.data.rows];

    if (newList.length > pageSize) {
      newList.slice(pageSize - 1, 1)
    }

    $wordsList.update({
      ...wordsListState,
      data: {
        ...wordsListState.data,
        rows: newList
      }
    });
  }

  const afterAdd = (item: WordItemModel) => {
    if (page === 1) {
      addForListNewItem(item);
    } else {
      onPaginationChange(1);
    }
  }

  const onPaginationChange = (page) => {
    setPage(page);
  }

  const afterExerciseSelect = (type: string) => {
    wordExercisesModalControl.openModal({ type, words: wordsListState.data.rows });
  }

  return (
    <ContentUI>
      <div className="folder-head content-block">
        <h1>Словарь</h1>
        <div className="folder-head__right">
          <ButtonUI
            type="primary"
            withIcon
            onClick={() => selectExerciseTypeModalControl.openModal()}
          >
            Упражнения
          </ButtonUI>
          <ButtonUI
            type="primary"
            withIcon
            onClick={() => addWordModalControl.openModal()}
          >
            <AddPlusSvgIcon /> Добавить слово
          </ButtonUI>
        </div>
      </div>

      <div className="words__wrap">
        <WordCategories selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        <div className="words__list">
          {wordsListState.loading && (
            <div className="abs-loader">
              <Spinner />
            </div>
          )}

          <div className="words__list__in">
            {wordsListState.data.rows.map((item) => (
              <div className="words__list__item__outer" key={item.id}>
                <div className="words__list__item">
                  <div className="words__list__item__value">{item.value}</div>
                  {item.transcription && (
                    <div className="words__list__item__transc">[{item.transcription}]</div>
                  )}
                  <div className="words__list__item__translate">
                    {item.translate[myCurrentLang]}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Pagination
            defaultCurrent={page}
            total={wordsListState.data.count}
            onChange={onPaginationChange}
            hideOnSinglePage={true}
          />

        </div>
      </div>

      <ModalUI
        open={addWordModalControl.modalProps.open}
        onCancel={addWordModalControl.closeModal}
        width={800}
      >
        <AddWordModal modalControl={addWordModalControl} callback={afterAdd} />
      </ModalUI>

      <ModalUI
        open={selectExerciseTypeModalControl.modalProps.open}
        onCancel={selectExerciseTypeModalControl.closeModal}
      >
        <SelectExerciseTypeModal modalControl={selectExerciseTypeModalControl} callback={afterExerciseSelect} />
      </ModalUI>

      <ModalUI
        open={wordExercisesModalControl.modalProps.open}
        onCancel={wordExercisesModalControl.closeModal}
        className="words-exercise-modal"
        width={800}
      >
        <WordExercisesModal modalControl={wordExercisesModalControl} />
      </ModalUI>

    </ContentUI>
  );
}