import React from "react";
import { HomeworkDetails } from "#src/app/sections/lessons/details/homework";
import { ContentUI } from "#ui/content";

import "./styles.scss";
import { parseParams } from "#hooks/useQueryParams";
import { useRole } from "#hooks/useRole";

export const HomeworkDetailsPage = (props) => {
  const { match } = props;
  const homeworkId = Number(match.params.id);

  const queryParams = parseParams(location.search, false);

  const { isTeacher } = useRole();

  return (
    <ContentUI>
      <div className="content-block homework-page">
        <HomeworkDetails
          homeworkId={homeworkId}
          isMine={false}
          studentId={isTeacher && queryParams.studentId ? Number(queryParams.studentId) : undefined}
        />
      </div>
    </ContentUI>
  )
}