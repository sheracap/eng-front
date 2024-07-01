import React, { FC } from "react";
import { Carousel } from 'antd';

import { ExerciseItemModel } from "#businessLogic/models/section";

import "./styles.scss";
import { imagesBaseUrl } from "#constants/index";

type PropsTypes = {
  data: ExerciseItemModel;
  showHints: boolean;
  answersState: any;
  onCreateExerciseAnswer: (id: any, res: any, prevState: any) => void;
}


export const TemplateImages: FC<PropsTypes> = (props) => {
  const { data } = props;

  return (
    <div className="images-exercise">
      {data.metaData?.images && data.metaData.images.length > 1 && (
        <Carousel>
          {data.metaData.images.map((item) => (
            <div key={item} className="images-exercise__item">
              <img src={`${imagesBaseUrl}/exercises/${item}`} alt=""/>
            </div>
          ))}
        </Carousel>
      )}
      {data.metaData?.images && data.metaData.images.length === 1 && (
        <div className="images-exercise__item">
          <img src={`${imagesBaseUrl}/exercises/${data.metaData.images[0]}`} alt=""/>
        </div>
      )}
    </div>
  )
};