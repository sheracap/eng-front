import React, { useEffect, useRef, useState } from "react";
import { useStore } from "effector-react";
import { Pagination, Switch, Form } from "antd";

import { $currentUser } from "#stores/account";
import { $textForReadingDetails, $textForReadingList } from "#stores/textForReading";
import { $myTextForReading, $selectedTextIdForReading } from "#src/app/sections/pronunciation/effector";

import { InputUI } from "#ui/input";
import { Spinner } from "#ui/spinner";
import { BackBtn } from "#ui/backBtn";

import { TextForReadingParamsTypes } from "#businessLogic/models/textForReading";
import { LevelSelect } from "#pickers/levelSelect";

export const TextForSpeaking = () => {

  const currentUserState = useStore($currentUser.store);
  const textForReadingListState = useStore($textForReadingList.store);
  const textForReadingDetailsState = useStore($textForReadingDetails.store);
  const selectedTextIdForReadingState = useStore($selectedTextIdForReading.store);

  const myText = useRef("");
  const [isMyText, setIsMyText] = useState(false);

  const [queryParams, setQueryParams] = useState<TextForReadingParamsTypes>({ level: currentUserState.data?.level || "a1", page: 1 });

  const { data, loading } = textForReadingListState;
  const { data: detailsData, loading: detailsLoading } = textForReadingDetailsState

  useEffect(() => {
    return () => {
      $myTextForReading.reset();
    }
  }, []);

  useEffect(() => {
    $textForReadingList.effect(queryParams);
  }, [queryParams]);

  useEffect(() => {
    if (selectedTextIdForReadingState && !detailsData[selectedTextIdForReadingState]) {
      $textForReadingDetails.effect({
        id: selectedTextIdForReadingState,
        level: queryParams.level
      });
    }
  }, [selectedTextIdForReadingState]);

  const onTextChange = (e) => {
    myText.current = e.target.value;
    $myTextForReading.update(e.target.value);
  }

  const onPaginationChange = (page) => {
    setQueryParams({
      ...queryParams,
      page
    });
  }

  const onLevelChange = (code) => {
    setQueryParams({
      ...queryParams,
      level: code
    });
  }

  const onBackClick = () => {
    $selectedTextIdForReading.update(null);
  }

  return (
    <div className="text-for-speaking content-block">
      {(loading || detailsLoading) && (
        <div className="abs-loader">
          <Spinner />
        </div>
      )}

      <div className="text-for-speaking__head">
        <div className="text-for-speaking__head__title">
          {selectedTextIdForReadingState ? (
            <>
              <BackBtn onBackClick={onBackClick} />
              <span>{detailsData[selectedTextIdForReadingState]?.title}</span>
            </>
          ) : (
            <span>{isMyText ? "Введите свой текст" : "Выберите текст из списка"}</span>
          )}
        </div>
        {!selectedTextIdForReadingState && (
          <div className="text-for-speaking__head__actions">
            Мой текст
            <Switch checked={isMyText} onChange={(val) => setIsMyText(val)} />
          </div>
        )}
      </div>

      {isMyText && (
        <div className="text-for-speaking__textarea u-fancy-scrollbar">
          <InputUI.TextArea
            placeholder="Введите текст"
            defaultValue={myText.current}
            onChange={onTextChange}
            autoSize
          />
        </div>
      )}

      {selectedTextIdForReadingState && detailsData[selectedTextIdForReadingState] && (
        <div className="text-for-speaking__details">
          {detailsData[selectedTextIdForReadingState].text}
        </div>
      )}

      {!isMyText && !selectedTextIdForReadingState && (
        <>
          <div className="text-for-speaking__filter">
            <Form.Item
              label="Уровень"
            >
              <LevelSelect
                onChange={onLevelChange}
                value={queryParams.level}
              />
            </Form.Item>
          </div>
          <div className="text-for-speaking__list u-fancy-scrollbar">
            {data.rows.map((item) => (
              <div
                className="text-for-speaking__list__item"
                key={item.id}
                onClick={() => $selectedTextIdForReading.update(item.id)}
              >
                {item.title}
              </div>
            ))}
          </div>
          <div className="text-for-speaking__pagination">
            <Pagination
              current={queryParams.page}
              total={data.count}
              onChange={onPaginationChange}
              hideOnSinglePage={true}
              showSizeChanger={false}
            />
          </div>
        </>
      )}
    </div>
  )
}