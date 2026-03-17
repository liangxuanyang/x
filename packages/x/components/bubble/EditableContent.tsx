import type { PropType } from "vue";

import { Button, Space } from "antdv-next";
import { defineComponent, ref, watch } from "vue";

import type { BubbleProps, EditableBubbleOption } from "./interface";

export const EditableContent = defineComponent({
  name: "XBubbleEditableContent",
  props: {
    content: {
      type: String,
      required: true,
    },
    prefixCls: {
      type: String,
      required: true,
    },
    okText: {
      type: [String, Object] as PropType<EditableBubbleOption["okText"]>,
      default: undefined,
    },
    cancelText: {
      type: [String, Object] as PropType<EditableBubbleOption["cancelText"]>,
      default: undefined,
    },
    onEditConfirm: {
      type: Function as PropType<BubbleProps["onEditConfirm"]>,
      default: undefined,
    },
    onEditCancel: {
      type: Function as PropType<BubbleProps["onEditCancel"]>,
      default: undefined,
    },
  },
  setup(props) {
    const draft = ref(props.content);

    watch(
      () => props.content,
      value => {
        draft.value = value;
      },
    );

    const onInput = (event: Event) => {
      draft.value = (event.target as HTMLTextAreaElement).value;
    };

    const confirm = () => {
      props.onEditConfirm?.(draft.value);
    };

    const cancel = () => {
      draft.value = props.content;
      props.onEditCancel?.();
    };

    return () => (
      <div class={`${props.prefixCls}-editing`}>
        <textarea
          class={`${props.prefixCls}-editing-input`}
          value={draft.value}
          onInput={onInput}
          rows={4}
        />
        <Space class={`${props.prefixCls}-editing-opts`} size={8}>
          <Button type="primary" shape="round" size="small" onClick={confirm}>
            {props.okText ?? "Confirm"}
          </Button>
          <Button shape="round" size="small" onClick={cancel}>
            {props.cancelText ?? "Cancel"}
          </Button>
        </Space>
      </div>
    );
  },
});
