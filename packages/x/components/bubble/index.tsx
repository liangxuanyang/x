import Bubble, { XBubble } from "./Bubble";
import BubbleList, { XBubbleList } from "./BubbleList";
import BubbleDivider, { XBubbleDivider } from "./Divider";
import BubbleSystem, { XBubbleSystem } from "./System";

export type {
  BubbleItemType,
  BubbleListProps,
  BubbleListRef,
  BubbleProps,
  BubbleRef,
} from "./interface";

type BubbleType = typeof Bubble & {
  List: typeof BubbleList;
  System: typeof BubbleSystem;
  Divider: typeof BubbleDivider;
};

const BubbleWithSub = Bubble as BubbleType;
BubbleWithSub.List = BubbleList;
BubbleWithSub.System = BubbleSystem;
BubbleWithSub.Divider = BubbleDivider;

export {
  BubbleDivider,
  BubbleList,
  BubbleSystem,
  XBubble,
  XBubbleDivider,
  XBubbleList,
  XBubbleSystem,
};

export default BubbleWithSub;
