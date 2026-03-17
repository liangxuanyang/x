import type { ActionsToken } from ".";
import type { GenerateStyle } from "../../theme/interface";

const genActionsFeedbackStyle: GenerateStyle<ActionsToken> = token => {
  const { componentCls } = token;
  const feedbackCls = `${componentCls}-feedback`;
  return {
    [componentCls]: {
      [`&${feedbackCls}-rtl`]: {
        direction: "rtl",
      },
    },
  };
};
export default genActionsFeedbackStyle;
