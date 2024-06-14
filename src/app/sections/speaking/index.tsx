import React from "react";
import { ContentUI } from "#ui/content";
import { TextForSpeaking } from "#src/app/sections/speaking/text";
import { SpeakingVoiceRecorder } from "#src/app/sections/speaking/voiceArea";

import "./styles.scss";

export const Speaking = () => {


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