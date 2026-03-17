import type { ActionsToken } from ".";
import type { GenerateStyle } from "../../theme/interface";

const genActionsAudioStyle: GenerateStyle<ActionsToken> = token => {
  const { componentCls } = token;
  const audioCls = `${componentCls}-audio`;

  return {
    [audioCls]: {
      [`&${audioCls}-rtl`]: {
        direction: "rtl",
      },
      [`${audioCls}-recording-icon`]: {
        width: token.fontSize,
        height: token.fontSize,
      },
    },
  };
};
export default genActionsAudioStyle;
