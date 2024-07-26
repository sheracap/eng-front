import React, { FC, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useStore } from "effector-react";
import { Pagination } from "antd";

import { $currentUser } from "#stores/account";
import { $booksList } from "#stores/books";

import { ContentUI } from "#ui/content";
import { imagesBaseUrl, ROUTES } from "#constants/index";

import "./styles.scss";

export const BooksList: FC = () => {

  const history = useHistory();

  const booksListState = useStore($booksList.store);

  const currentUserState = useStore($currentUser.store);

  const [params, setParams] = useState<any>({ level: currentUserState.data?.level, page: 1 });

  const getList = () => {
    $booksList.effect(params);
  };

  useEffect(() => {
    getList();
  }, [params]);

  const onPaginationChange = (page) => {
    setParams({
      ...params,
      page
    });
  }

  return (
    <ContentUI>
      <div className="main-content">
        <div>
          <div className="folder-head content-block">
            <h1>Книги ({booksListState.data.count})</h1>
          </div>

          <div className="books">
            {booksListState.data.rows.map((item) => (
              <div
                className="books__item"
                key={item.id}
                onClick={() => history.push(`${ROUTES.BOOKS}/${item.id}`)}
              >
                <div className="books__item__image">
                  {item.img ? (
                    <img src={`${imagesBaseUrl}/books/${item.img}`} alt=""/>
                  ) : (
                    <div className="courses__item__image__empty"></div>
                  )}
                </div>
                <div className="courses__item__name">
                  {item.title}
                </div>
              </div>
            ))}
          </div>

          <Pagination
            current={params.page}
            total={booksListState.data.count}
            onChange={onPaginationChange}
            hideOnSinglePage={true}
            showSizeChanger={false}
          />

        </div>
      </div>
    </ContentUI>
  )
};
