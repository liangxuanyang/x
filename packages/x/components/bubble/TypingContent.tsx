import type { PropType } from "vue";

import { computed, defineComponent } from "vue";

import type { BubbleAnimationOption, BubbleProps } from "./interface";

import { useTyping } from "./hooks/useTyping";

export const TypingContent = defineComponent({
  name: "XBubbleTypingContent",
  props: {
    prefixCls: {
      type: String,
      required: true,
    },
    streaming: {
      type: Boolean,
      default: false,
    },
    content: {
      type: String,
      required: true,
    },
    typing: {
      type: [Boolean, Object] as PropType<true | BubbleAnimationOption>,
      required: true,
    },
    onTyping: {
      type: Function as PropType<BubbleProps["onTyping"]>,
      default: undefined,
    },
    onTypingComplete: {
      type: Function as PropType<BubbleProps["onTypingComplete"]>,
      default: undefined,
    },
  },
  setup(props) {
    const { renderedData, animating, animationCfg } = useTyping({
      content: () => props.content,
      streaming: () => props.streaming,
      typing: () => props.typing,
      onTyping: props.onTyping,
      onTypingComplete: props.onTypingComplete,
    });

    const isTyping = computed(() => animationCfg.value?.effect === "typing");

    return () => (
      <div
        class={[
          isTyping.value && animating.value
            ? `${props.prefixCls}-typing`
            : null,
          animationCfg.value?.effect === "fade-in"
            ? `${props.prefixCls}-fade-in`
            : null,
        ]}
      >
        {renderedData.value.map(item =>
          animationCfg.value?.effect === "fade-in" && !item.done ? (
            <span key={item.id} class="fade-in">
              {item.text}
            </span>
          ) : (
            item.text
          ),
        )}
      </div>
    );
  },
});
