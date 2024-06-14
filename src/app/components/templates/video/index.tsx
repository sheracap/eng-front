import React, { FC } from "react";

import { ExerciseItemModel } from "#businessLogic/models/section";
import { VideoUi } from "#ui/video";

type PropsTypes = {
  data: ExerciseItemModel;
  showHints: boolean;
  answersState: any;
  onCreateExerciseAnswer: (id: any, res: any, prevState: any) => void;
}

export const TemplateVideo: FC<PropsTypes> = (props) => {
  const { data } = props;

  return (
    <>
      <VideoUi url={data.metaData.url} />
    </>
  )
};