import React, { FC, useEffect, useMemo, useState } from "react";
import { useStore } from "effector-react";

import { $bookPageDetails } from "#stores/books";

import { BookDetailsModel } from "#businessLogic/models/books";

import { useLocation } from "react-router";
import { parseParams } from "#hooks/useQueryParams";
import { Spinner } from "#ui/spinner";
import { Pagination } from "antd";

import "./styles.scss";

type PropsTypes = {
  data: BookDetailsModel;
}

export const BookDetailsPages: FC<PropsTypes> = (props) => {
  const { data } = props;

  const location = useLocation();

  const queryParams = parseParams(location.search, false);

  const bookPageDetailsState = useStore($bookPageDetails.store);

  const [currentPage, setCurrentPage] = useState(queryParams.page ? Number(queryParams.page) : 1);

  const currentPageId = useMemo(() => {
    return data.bookPages[currentPage - 1].id;
  }, [currentPage]);

  const parentPageTitle = useMemo(() => {
    let title = "";

    for (let i = currentPage - 2; i >= 0; i--) {
      const curTitle = data.bookPages[i].title;

      if (curTitle) {
        title = curTitle;
        break;
      }
    }

    return title;
  }, [currentPage]);

  useEffect(() => {
    if (!bookPageDetailsState.data[currentPageId]) {
      $bookPageDetails.effect(currentPageId);
    }
  }, [currentPageId]);

  const onPaginationChange = (page) => {
    setCurrentPage(page);
  }

  return (
    <div className="main-content">
      {bookPageDetailsState.loading && (
        <div className="abs-loader">
          <Spinner />
        </div>
      )}

      <div>{data.title}</div>

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
          <div style={{ whiteSpace: "pre-wrap" }}>
            {bookPageDetailsState.data[currentPageId].text}
          </div>
        </div>
      )}

      <Pagination
        current={currentPage}
        total={data.bookPages.length}
        onChange={onPaginationChange}
        hideOnSinglePage={true}
        showSizeChanger={false}
      />
    </div>
  )
}