import React, { FC } from "react";
import { useHistory } from "react-router-dom";

import { BookDetailsModel } from "#businessLogic/models/books";
import { imagesBaseUrl, ROUTES } from "#constants/index";

import { ButtonUI } from "#ui/button";
import { BackBtn } from "#ui/backBtn";

import "./styles.scss";

type PropsTypes = {
  data: BookDetailsModel;
}

export const BookDetailsInfo: FC<PropsTypes> = (props) => {
  const { data } = props;

  const history = useHistory();

  return (
    <div className="book-details__info">

      <div className="book-details__info__head content-block">
        <div>
          <div className="book-details__info__head__name">
            <BackBtn onBackClick={() => history.goBack()} />
            {data.title}
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

      <div>Уровень: {data.level}</div>

      <div className="book-details__info__contents">
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
                  history.push(`${ROUTES.BOOKS}/pages?page=${index + 1}`);
                }}
              >
                <div>
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

      <ButtonUI
        type="primary"
        onClick={() => {
          history.push(`${ROUTES.BOOKS}/pages`);
        }}
      >
        Читать
      </ButtonUI>

    </div>
  )
}