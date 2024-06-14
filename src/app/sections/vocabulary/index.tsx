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

import { AddWordModal, myCurrentLang } from "./addWordModal";
import { WordCategories } from "./categories";
import { SelectExerciseTypeModal } from "./selectExerciseTypeModal";
import { WordExercisesModal, WordExercisesModalType } from "./wordExercisesModal";

import "./styles.scss";

const pageSize = 20;

export const Vocabulary: FC = () => {

  const wordsListState = useStore($wordsList.store);

  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<undefined | { id: number; name: string; }>(undefined);

  const addWordModalControl = useModalControl();
  const selectExerciseTypeModalControl = useModalControl();
  const wordExercisesModalControl = useModalControl<WordExercisesModalType>();

  useEffect(() => {
    if (!wordsListState.data.pages[page]) {
      $wordsList.effect({
        page,
        wordCategoryId: selectedCategory?.id,
      });
    }
  }, [page, selectedCategory]);

  const addForListNewItem = (item, newPage) => {
    const newList = [item, ...wordsListState.data.pages[newPage]];

    if (newList.length > pageSize) {
      newList.slice(pageSize - 1, 1)
    }

    $wordsList.update({
      ...wordsListState,
      data: {
        count: newList.length,
        pages: {
          [newPage]: newList
        }
      }
    });
  }

  const afterAdd = (item: WordItemModel) => {
    if (page === 1) {
      addForListNewItem(item, page);
    } else {
      if (wordsListState.data.pages[1]) {
        addForListNewItem(item, 1);
      } else {
        // условие выполнится если будут queryParams в урле
        // сейчас оно никогда не выполняется

        $wordsList.update({
          ...wordsListState,
          data: {
            count: wordsListState.data.count + 1,
            pages: {}
          }
        });
      }

      setPage(1);
    }
  }

  const onPaginationChange = (page) => {
    setPage(page);
  }

  // if new added 1) go to first page 2) if first page items length === size remove last item 3) inc count 4) add new item to top
  // cache pages and reset them after adding new

  const afterExerciseSelect = (type: string) => {
    wordExercisesModalControl.openModal({ type, words: wordsListState.data.pages[page] });
  }


  return (
    <ContentUI>
      <div className="folder-head content-block">
        <h1>Словарь {wordsListState.data.count ? `(${wordsListState.data.count})` : ""}</h1>
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
          <div>
            {wordsListState.data.pages[page]?.map((item) => (
              <div className="words__list__item" key={item.id}>
                <div className="words__list__item__value">{item.value}</div>
                <div className="words__list__item__translate">
                  {item.translate[myCurrentLang]}
                </div>
              </div>
            ))}

            <Pagination
              defaultCurrent={page}
              total={wordsListState.data.count}
              onChange={onPaginationChange}
              hideOnSinglePage={true}
            />
          </div>
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