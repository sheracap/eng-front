import React, { FC } from "react";
import { Carousel } from "antd";

import { ExerciseItemModel } from "#businessLogic/models/section";

type PropsTypes = {
  data: ExerciseItemModel;
  showHints: boolean;
  answersState: any;
  onCreateExerciseAnswer: (id: any, res: any, prevState: any) => void;
}

export const TemplateImages: FC<PropsTypes> = (props) => {
  const { data } = props;

  return (
    <>
      <Carousel>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
      </Carousel>
    </>
  )
};