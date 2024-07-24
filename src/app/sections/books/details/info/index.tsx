import React, { FC } from "react";
import { BookDetailsModel } from "#businessLogic/models/books";
import { imagesBaseUrl, ROUTES } from "#constants/index";
import { useHistory } from "react-router-dom";
import { ButtonUI } from "#ui/button";

type PropsTypes = {
  data: BookDetailsModel;
}

export const BookDetailsInfo: FC<PropsTypes> = (props) => {
  const { data } = props;

  const history = useHistory();

  return (
    <div className="main-content">
      <div>
        {data.title}
      </div>

      <div>
        {data.img && (
          <img src={`${imagesBaseUrl}/books/${data.img}`} alt=""/>
        )}
      </div>

      <div>Уровень: {data.level}</div>

      <div>Desc: {data.description}</div>

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