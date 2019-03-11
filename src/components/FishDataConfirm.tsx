import React, { useState } from "react";
import Reward from "react-rewards";

import { strings } from "../i18n";

export const FishDataConfirm = ({ triggerNextStep }: any) => {
  const [done, setDone] = useState(false);

  return (
    <Reward
      ref={(ref: any) => {
        if (ref && !done) {
          ref.rewardMe();
          setDone(true);

          triggerNextStep();
        }
      }}
      type="emoji"
      config={{
        emoji: ["🐟", "🦐", "🐙", "🦀", "🐳", "🐋", "🐬", "🦑", "🐡", "🦈"]
      }}
    >
      <div>{strings.prompt_catchCongrat}</div>
    </Reward>
  );
};
