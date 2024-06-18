import React, { FC } from "react";

type PropsTypes = { url: string };

import "./styles.scss";

const extractVideoId = (url) => {
  const regex = /(?:\?v=|\/embed\/|\.be\/|\/v\/|\/watch\?v=|\/\?v=|\/v=|youtu\.be\/|\/embed\/|\/shorts\/|\/watch\?v%3D|\/watch\?.+&v=)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export const VideoUi: FC<PropsTypes> = (props) => {
  const { url } = props;

  const videoId = extractVideoId(url);

  return (
    <div className="video-iframe">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded YouTube Video"
      />
    </div>
  )
};