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

import { AddWordModal } from "./addWordModal";
import { WordCategories } from "#src/app/sections/vocabulary/categories";

import "./styles.scss";

const pageSize = 20;

export const Vocabulary: FC = () => {

  const wordsListState = useStore($wordsList.store);

  const [page, setPage] = useState(0);

  const addWordModalControl = useModalControl();

  useEffect(() => {
    if (!wordsListState.data.count) {
      $wordsList.effect({
        page
      });
    }
  }, []);

  useEffect(() => {
    if (!wordsListState.data.pages[page]) {
      $wordsList.effect({
        page
      });
    }
  }, [page]);

  const addForListNewItem = (item, newPage) => {
    const newList = [item, ...wordsListState.data[newPage]];

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
    if (page === 0) {
      addForListNewItem(item, page);
    } else {
      if (wordsListState.data.pages[0]) {
        addForListNewItem(item, 0);
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

      setPage(0);
    }
  }

  const onPaginationChange = (page) => {
    setPage(page - 1);
  }

  // if new added 1) go to first page 2) if first page items length === size remove last item 3) inc count 4) add new item to top
  // cache pages and reset them after adding new


  return (
    <ContentUI>
      <div className="folder-head content-block">
        <h1>Словарь</h1>
        <ButtonUI
          type="primary"
          withIcon
          onClick={() => addWordModalControl.openModal()}
        >
          <AddPlusSvgIcon /> Добавить слово
        </ButtonUI>
      </div>

      <div className="words__wrap">
        <WordCategories />
        <div className="words__list">
          {wordsListState.data.pages[page]?.map((item) => (
            <div className="words__list__item" key={item.id}>
              <div className="words__list__item__value">{item.value}</div>
              <div className="words__list__item__translate">Тест</div>
            </div>
          ))}

          <Pagination
            defaultCurrent={page + 1}
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

    </ContentUI>
  );
}