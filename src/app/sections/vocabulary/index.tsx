import React, { FC, useEffect } from "react";
import { useStore } from "effector-react";

import { $newAddedWordsList, $wordsList } from "#stores/words";

import { ContentUI } from "#ui/content";
import { ButtonUI } from "#ui/button";

import { AddPlusSvgIcon } from "#src/assets/svg";

import { useModalControl } from "#hooks/useModalControl";



export const Vocabulary: FC = () => {

  const wordsListState = useStore($wordsList.store);
  const newAddedWordsListState = useStore($newAddedWordsList.store);

  const addWordModalControl = useModalControl();

  useEffect(() => {
    if (wordsListState.data.count === 0) {
      $wordsList.effect({});
    }
  }, []);

  const onPaginationChange = () => {
    if (newAddedWordsListState.length) {
      $newAddedWordsList.reset();
    }
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
      <div onClick={() => {

        const newList = [1];

        $wordsList.update({
          ...wordsListState,
          data: { count: 1, rows: newList }
        })

      }}>
        asd
      </div>

      {wordsListState.data.rows.map((item) => (
        <div key={item}>{item}</div>
      ))}

      Count: {wordsListState.data.count}

    </ContentUI>
  );
}