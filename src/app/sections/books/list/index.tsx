import React, { FC, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useStore } from "effector-react";
import { Pagination } from "antd";

import { $currentUser } from "#stores/account";
import { $booksList } from "#stores/books";

import { ContentUI } from "#ui/content";
import { imagesBaseUrl, ROUTES } from "#constants/index";

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

          {booksListState.data.rows.map((item) => (
            <div key={item.id} onClick={() => history.push(`${ROUTES.BOOKS}/${item.id}`)}>

              {item.img ? (
                <img src={`${imagesBaseUrl}/books/${item.img}`} alt=""/>
              ) : (
                <div className="image__empty"></div>
              )}

              {item.title}
            </div>
          ))}

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
