import type { ActionsToken } from ".";
import type { GenerateStyle } from "../../theme/interface";

const genActionsCopyStyle: GenerateStyle<ActionsToken> = token => {
  const { componentCls } = token;

  const copyCls = `${componentCls}-copy`;
  return {
    [componentCls]: {
      [`&${copyCls}-rtl`]: {
        direction: "rtl",
      },
      [`${copyCls}-copy`]: {
        fontSize: "inherit",
        [`&:not(${componentCls}-copy-success)`]: {
          color: "inherit!important",
        },
      },
    },
  };
};

export default genActionsCopyStyle;
