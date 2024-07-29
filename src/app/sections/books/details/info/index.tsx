import React, { FC } from "react";
import { useHistory } from "react-router-dom";

import { BookDetailsModel } from "#businessLogic/models/books";
import { imagesBaseUrl, ROUTES } from "#constants/index";

import { ButtonUI } from "#ui/button";
import { BackBtn } from "#ui/backBtn";
import { SelectUI } from "#ui/select";

type PropsTypes = {
  data: BookDetailsModel;
}

const levels = {
  "a1": "Начальный",
  "a2": "Ниже среднего",
  "b1": "Средний",
  "b2": "Выше среднего",
  "c1": "Продвинутый",
  "c2": "Профессиональный"
}

export const BookDetailsInfo: FC<PropsTypes> = (props) => {
  const { data } = props;

  const history = useHistory();

  return (
    <div className="book-details__info">

      <div className="book-details__info__head content-block">
        <div>
          <div className="book-details__info__head__name-wr">
            <div className="book-details__info__head__name">
              <BackBtn onBackClick={() => history.push(ROUTES.BOOKS)} />
              {data.title}
            </div>
            <div className="book-details__info__head__level">
              Уровень: <span>{levels[data.level]}</span>
            </div>
          </div>
          <div className="book-details__info__head__desc">
            {data.img && (
              <div className="book-details__info__head__img">
                <img src={`${imagesBaseUrl}/books/${data.img}`} alt="" />
              </div>
            )}
            <div>{data.description}</div>
          </div>
        </div>
      </div>


      <div className="book-details__info__contents content-block">
        <div className="book-details__info__contents__title">Содержание</div>
        <div>
          {data.bookPages.map((item, index) => {
            if (!item.title) {
              return null;
            }

            return (
              <div
                key={item.id}
                className="book-details__info__contents__item"
                onClick={() => {
                  history.push(`${ROUTES.BOOKS}/${data.id}/pages?page=${index + 1}`);
                }}
              >
                <div className="book-details__info__contents__item__title">
                  {item.title}
                </div>
                <div className="book-details__info__contents__item__dots"></div>
                <div>
                  {index + 1}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="book-details__info__read">
        <ButtonUI
          type="primary"
          onClick={() => {
            history.push(`${ROUTES.BOOKS}/${data.id}/pages`);
          }}
        >
          Читать
        </ButtonUI>
      </div>
    </div>
  )
}