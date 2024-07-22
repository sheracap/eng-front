import React, { useEffect, useMemo, useRef, useState } from "react";
import { Pagination, Switch } from "antd";
import { InputUI } from "#ui/input";
import { $textForReadingDetails, $textForReadingList } from "#stores/textForReading";
import { useStore } from "effector-react";
import { Spinner } from "#ui/spinner";
import { TextForReadingParamsTypes } from "#businessLogic/models/textForReading";
import { BackBtn } from "#ui/backBtn";
import { $myTextForReading, $selectedTextIdForReading } from "#src/app/sections/speaking/effector";

export const TextForSpeaking = () => {

  const textForReadingListState = useStore($textForReadingList.store);
  const textForReadingDetailsState = useStore($textForReadingDetails.store);
  const selectedTextIdForReadingState = useStore($selectedTextIdForReading.store);

  const myText = useRef("");
  const [isMyText, setIsMyText] = useState(false);
  // level of currentUser
  const [queryParams, setQueryParams] = useState<TextForReadingParamsTypes>({ level: "a1", page: 1 });

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

  const englishLevels = useMemo(() => {
    return [
      { code: "a1", name: "A1" },
      { code: "a2", name: "A2" },
      { code: "b1", name: "B1" },
      { code: "b2", name: "B2" },
      { code: "c1", name: "C1" },
      { code: "c2", name: "C2" },
    ]
  }, []);

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
            {englishLevels.map((item) => (
              <div
                className={`text-for-speaking__filter__item ${queryParams.level === item.code ? "active" : ""}`}
                key={item.code}
                onClick={() => onLevelChange(item.code)}
              >
                {item.name}
              </div>
            ))}
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