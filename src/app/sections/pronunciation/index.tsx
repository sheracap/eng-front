import React from "react";
import { ContentUI } from "#ui/content";
import { TextForSpeaking } from "#src/app/sections/pronunciation/text";
import { SpeakingVoiceRecorder } from "#src/app/sections/pronunciation/voiceArea";

import "./styles.scss";

export const Pronunciation = () => {


  return (
    <ContentUI>
      <div className="speaking-wrap">
        <div className="speaking-wrap__col">
          <div>
            <TextForSpeaking />
          </div>
        </div>
        <div className="speaking-wrap__col">
          <div>
            <SpeakingVoiceRecorder />
          </div>
        </div>
      </div>
    </ContentUI>
  );
}