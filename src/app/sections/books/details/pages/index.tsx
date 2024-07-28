import React, { FC, useEffect, useMemo, useState } from "react";
import { useStore } from "effector-react";

import { $bookPageDetails } from "#stores/books";

import { BookDetailsModel } from "#businessLogic/models/books";

import { useLocation } from "react-router";
import { parseParams } from "#hooks/useQueryParams";
import { Spinner } from "#ui/spinner";
import { Pagination } from "antd";

import "./styles.scss";
import { BackBtn } from "#ui/backBtn";
import { useHistory } from "react-router-dom";
import { ROUTES } from "#constants/index";
import { ButtonUI } from "#ui/button";

type PropsTypes = {
  data: BookDetailsModel;
}

export const BookDetailsPages: FC<PropsTypes> = (props) => {
  const { data } = props;

  const history = useHistory();
  const location = useLocation();

  const queryParams = parseParams(location.search, false);

  const bookPageDetailsState = useStore($bookPageDetails.store);

  const [currentPage, setCurrentPage] = useState(queryParams.page ? Number(queryParams.page) : 1);

  const currentPageId = useMemo(() => {
    return data.bookPages[currentPage - 1]?.id;
  }, [currentPage]);

  const parentPageTitle = useMemo(() => {
    let title = "";

    for (let i = currentPage - 2; i >= 0; i--) {
      const curTitle = data.bookPages[i]?.title;

      if (curTitle) {
        title = curTitle;
        break;
      }
    }

    return title;
  }, [currentPage]);

  useEffect(() => {
    if (currentPageId && !bookPageDetailsState.data[currentPageId]) {
      $bookPageDetails.effect(currentPageId);
    }
  }, [currentPageId]);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    history.push(`${ROUTES.BOOKS}/${data.id}/pages?page=${page}`);
  }

  return (
    <div className="book-details__pages-wrap content-block">
      <div className="book-details__pages__title">
        <BackBtn onBackClick={() => history.push(`${ROUTES.BOOKS}/${data.id}`)} />
        {data.title}
      </div>
      <div className="book-details__pages u-fancy-scrollbar">
        <div className="book-details__pages__in">
          {bookPageDetailsState.loading && (
            <div className="abs-loader">
              <Spinner />
            </div>
          )}

          {bookPageDetailsState.data[currentPageId] && (
            <div>
              {bookPageDetailsState.data[currentPageId].title ? (
                <div className="current-page-title">
                  {bookPageDetailsState.data[currentPageId].title}
                </div>
              ) : (
                <div className="parent-page-title">
                  {parentPageTitle}
                </div>
              )}
              <div className="book-details__pages__text">
                {bookPageDetailsState.data[currentPageId].text}
              </div>
            </div>
          )}

        </div>



      </div>
      {currentPageId && data.bookPages.length > 1 && (
        <div className="book-details__pages__pagination">
          <div className="book-details__pages__pagination__left">
            {currentPage > 1 && (
              <ButtonUI
                type="primary"
                size="small"
                onClick={() => {
                  onPageChange(currentPage - 1);
                }}
              >
                Предыдущая страница
              </ButtonUI>
            )}
          </div>
          <div className="book-details__pages__pagination__right">
            {currentPage !== data.bookPages.length && (
              <ButtonUI
                type="primary"
                size="small"
                onClick={() => {
                  onPageChange(currentPage + 1);
                }}
              >
                Следующая страница
              </ButtonUI>
            )}
          </div>
        </div>
      )}
    </div>
  )
}