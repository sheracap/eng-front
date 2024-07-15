import React, { FC } from "react";

import { ExerciseItemModel } from "#businessLogic/models/section";
import { imagesBaseUrl } from "#constants/index";

type PropsTypes = {
  data: ExerciseItemModel;
  showHints: boolean;
  answersState: any;
  onCreateExerciseAnswer: (id: any, res: any, prevState: any) => void;
}

export const TemplateAudio: FC<PropsTypes> = (props) => {
  const { data } = props;

  return (
    <div>
      <audio key={data.metaData.audio} controls style={{ width: "100%" }}>
        <source src={`${imagesBaseUrl}/audio/${data.metaData.audio}`} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  )
};