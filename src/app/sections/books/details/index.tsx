import React, { FC, useEffect } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { ContentUI } from "#ui/content";
import { useStore } from "effector-react";
import { $bookDetails } from "#stores/books";
import { ROUTES } from "#constants/index";
import { BookDetailsInfo } from "./info";
import { BookDetailsPages } from "./pages";

import "./styles.scss";

export interface BookDetailsMatchParams {
  id: string;
}

export const BookDetailsPage: FC = () => {
  const match = useRouteMatch<BookDetailsMatchParams>();
  const bookId = Number(match.params.id);

  const { data, loading } = useStore($bookDetails.store);

  useEffect(() => {
    $bookDetails.effect(bookId);
  }, []);

  if (!data) {
    return (
      <ContentUI loading={true} />
    )
  }

  return (
    <ContentUI loading={loading}>
      <div className="book-details">
        <Switch>
          <Route
            exact
            path={match.path}
            render={() => (
              <BookDetailsInfo data={data} />
            )}
          />
          <Route
            path={`${ROUTES.BOOKS}/${bookId}/pages`}
            render={() => (
              <BookDetailsPages data={data} />
            )}
          />
        </Switch>
      </div>
    </ContentUI>
  )
};