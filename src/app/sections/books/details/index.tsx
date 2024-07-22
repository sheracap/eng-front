import React, { FC, useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { ContentUI } from "#ui/content";
import { useStore } from "effector-react";
import { $bookDetails } from "#stores/books";

export interface BookDetailsMatchParams {
  id: string;
}

export const BookDetailsPage: FC = () => {
  const match = useRouteMatch<BookDetailsMatchParams>();
  const bookId = Number(match.params.id);

  const history = useHistory();

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
      <div className="main-content">
        {data.title}

        <div>Desc: {data.description}</div>
      </div>
    </ContentUI>
  )
};