import React from "react";
import { HomeworkDetails } from "#src/app/sections/lessons/details/homework";
import { ContentUI } from "#ui/content";

import "./styles.scss";

export const HomeworkDetailsPage = (props) => {
  const { match } = props;
  const homeworkId = Number(match.params.id);

  return (
    <ContentUI>
      <div className="content-block homework-page">
        <HomeworkDetails homeworkId={homeworkId} isMine={false} />
      </div>
    </ContentUI>
  )
}