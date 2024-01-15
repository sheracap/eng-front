import React, { FC, useState } from "react";
import { Spinner } from "#ui/spinner";

type PropsTypes = { url: string };

export const VideoUi: FC<PropsTypes> = (props) => {
  const { url } = props;

  const [canPlay, setCanPlay] = useState(false);

  return (
    <>
      <div>
        {!canPlay && (
          <div>
            <Spinner />
          </div>
        )}
        <video {...(!canPlay ? { width: 0 } : { height: 500 })} controls onCanPlay={() => setCanPlay(true)}>
          <source src={url} type="video/mp4" />
        </video>
      </div>
    </>
  )
};