import type { ActionsAudioProps } from "./ActionsAudio";
import type { ActionsCopyProps } from "./ActionsCopy";
import type { ActionsFeedbackProps } from "./ActionsFeedback";
import type { ActionsItemProps } from "./ActionsItem";

import Actions, { XActions } from "./Actions";
import ActionsAudio from "./ActionsAudio";
import ActionsCopy from "./ActionsCopy";
import ActionsFeedback from "./ActionsFeedback";
import ActionsItem, { ACTIONS_ITEM_STATUS } from "./ActionsItem";

export type {
  ActionsClickInfo,
  ActionsProps,
  ActionsRef,
  ItemType,
} from "./interface";

type ActionsType = typeof Actions & {
  Feedback: typeof ActionsFeedback;
  Copy: typeof ActionsCopy;
  Item: typeof ActionsItem;
  Audio: typeof ActionsAudio;
};

const ActionsWithSub = Actions as ActionsType;
ActionsWithSub.Feedback = ActionsFeedback;
ActionsWithSub.Copy = ActionsCopy;
ActionsWithSub.Item = ActionsItem;
ActionsWithSub.Audio = ActionsAudio;

export {
  ACTIONS_ITEM_STATUS,
  ActionsAudio,
  ActionsCopy,
  ActionsFeedback,
  ActionsItem,
  XActions,
};

export type {
  ActionsAudioProps,
  ActionsCopyProps,
  ActionsFeedbackProps,
  ActionsItemProps,
};

export default ActionsWithSub;
