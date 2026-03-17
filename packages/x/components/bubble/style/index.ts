import { mergeToken } from "@antdv-next/cssinjs/cssinjs-utils";

import type { GetDefaultToken } from "../../theme/interface";
import type { BubbleToken } from "./bubble";

import { genStyleHooks } from "../../theme/genStyleUtils";
import genBubbleStyle from "./bubble";
import { genShapeStyle, genVariantStyle } from "./content";
import { genDividerBubbleStyle } from "./divider";
import genBubbleListStyle from "./list";
import { genSlotStyle } from "./slot";
import { genSystemBubbleStyle } from "./system";

export const prepareComponentToken: GetDefaultToken<"Bubble"> = () => ({
  typingContent: '"|"',
  typingAnimationName: "cursorBlink",
  typingAnimationDuration: "0.8s",
});

export interface ComponentToken {
  /**
   * @desc 打字动画内容
   * @descEN Typing animation content
   */
  typingContent: string;
  /**
   * @desc 打字动画持续时间
   * @descEN Typing animation duration
   */
  typingAnimationDuration: string;
  /**
   * @desc 打字动画名称
   * @descEN Typing animation name
   */
  typingAnimationName: string;
}

export default genStyleHooks<"Bubble">(
  "Bubble",
  token => {
    const bubbleToken = mergeToken<BubbleToken>(token, {});
    return [
      // 位置越靠后，样式优先级越高
      genBubbleStyle(bubbleToken),
      genVariantStyle(bubbleToken),
      genShapeStyle(bubbleToken),
      genSlotStyle(bubbleToken),
      genBubbleListStyle(bubbleToken),
      genSystemBubbleStyle(bubbleToken),
      genDividerBubbleStyle(bubbleToken),
    ];
  },
  prepareComponentToken,
);
