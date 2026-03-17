import type { PropType, StyleValue } from "vue";

import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  ref,
  watch,
} from "vue";

import type {
  BubbleItemType,
  BubbleListProps,
  BubbleListRef,
  FuncRoleProps,
  RoleProps,
} from "./interface";

import Bubble from "./Bubble";
import DividerBubble from "./Divider";
import useBubbleStyle from "./style";
import SystemBubble from "./System";

function roleCfgIsFunction(
  roleCfg: RoleProps | FuncRoleProps,
): roleCfg is FuncRoleProps {
  return typeof roleCfg === "function";
}

function pickBubbleRef(instance: any) {
  if (!instance) return null;

  if ("nativeElement" in instance) return instance.nativeElement ?? null;

  return instance as Element;
}

export const XBubbleList = defineComponent({
  name: "XBubbleList",
  inheritAttrs: false,
  props: {
    prefixCls: {
      type: String,
      default: "antdx-bubble",
    },
    styles: {
      type: Object as PropType<BubbleListProps["styles"]>,
      default: () => ({}),
    },
    classes: {
      type: Object as PropType<BubbleListProps["classes"]>,
      default: () => ({}),
    },
    rootClassName: {
      type: String,
      default: "",
    },
    style: {
      type: [String, Object, Array] as PropType<StyleValue>,
      default: undefined,
    },
    class: {
      type: [String, Array, Object] as PropType<BubbleListProps["class"]>,
      default: undefined,
    },
    items: {
      type: Array as PropType<BubbleItemType[]>,
      required: true,
    },
    autoScroll: {
      type: Boolean,
      default: true,
    },
    role: {
      type: Object as PropType<BubbleListProps["role"]>,
      default: undefined,
    },
    onScroll: {
      type: Function as PropType<BubbleListProps["onScroll"]>,
      default: undefined,
    },
  },
  setup(props, { expose, attrs }) {
    const rootRef = ref<HTMLDivElement>();
    const scrollBoxRef = ref<HTMLDivElement>();
    const bubbleRefs = new Map<string | number, HTMLElement>();
    const stickToBottom = ref(true);
    const [hashId, cssVarCls] = useBubbleStyle(computed(() => props.prefixCls));

    const listPrefixCls = computed(() => `${props.prefixCls}-list`);

    const updateStickState = () => {
      const scrollBox = scrollBoxRef.value;
      if (!scrollBox) return;
      const distance =
        scrollBox.scrollHeight - scrollBox.scrollTop - scrollBox.clientHeight;
      stickToBottom.value = distance <= 56;
    };

    const scrollToBottom = (behavior: ScrollBehavior = "auto") => {
      const scrollBox = scrollBoxRef.value;
      if (!scrollBox) return;
      scrollBox.scrollTo({ top: scrollBox.scrollHeight, behavior });
    };

    const handleScroll = (event: Event) => {
      updateStickState();
      props.onScroll?.(event);
    };

    const mergedItems = computed(() => {
      return props.items.map(item => {
        if (item.role && props.role) {
          const cfg = props.role[item.role];
          if (cfg)
            return { ...(roleCfgIsFunction(cfg) ? cfg(item) : cfg), ...item };
        }
        return item;
      });
    });

    const bubbleClassNames = computed(() => {
      const {
        root: _root,
        scroll: _scroll,
        bubble,
        system,
        divider,
        ...rest
      } = props.classes || {};

      return {
        bubble,
        system,
        divider,
        rest,
      };
    });

    const bubbleStyles = computed(() => {
      const {
        root: _root,
        scroll: _scroll,
        bubble,
        system,
        divider,
        ...rest
      } = props.styles || {};

      return {
        bubble,
        system,
        divider,
        rest,
      };
    });

    const setBubbleRef = (key: string | number) => (instance: any) => {
      const element = pickBubbleRef(instance);
      if (element) bubbleRefs.set(key, element as HTMLElement);
      else bubbleRefs.delete(key);
    };

    const scrollTo: BubbleListRef["scrollTo"] = ({
      key,
      top,
      behavior = "smooth",
      block,
    }) => {
      const scrollBox = scrollBoxRef.value;
      if (!scrollBox) return;

      if (typeof top === "number") {
        scrollBox.scrollTo({ top, behavior });
        return;
      }

      if (top === "bottom") {
        scrollBox.scrollTo({ top: scrollBox.scrollHeight, behavior });
        return;
      }

      if (top === "top") {
        scrollBox.scrollTo({ top: 0, behavior });
        return;
      }

      if (key !== undefined) {
        const target = bubbleRefs.get(key);
        target?.scrollIntoView({ behavior, block: block ?? "nearest" });
      }
    };

    expose<BubbleListRef>({
      get nativeElement() {
        return rootRef.value as HTMLDivElement;
      },
      get scrollBoxNativeElement() {
        return scrollBoxRef.value as HTMLDivElement;
      },
      scrollTo,
    });

    watch(
      () => props.items,
      async () => {
        await nextTick();
        if (props.autoScroll && stickToBottom.value) scrollToBottom("smooth");
      },
      { deep: true },
    );

    watch(
      () => props.autoScroll,
      enabled => {
        if (enabled) scrollToBottom();
      },
      { immediate: true },
    );

    onMounted(() => {
      updateStickState();
      if (props.autoScroll) scrollToBottom();
    });

    return () => (
      <div
        ref={rootRef}
        {...attrs}
        class={[
          listPrefixCls.value,
          props.rootClassName,
          props.classes?.root,
          hashId.value,
          cssVarCls.value,
          props.class,
          attrs.class,
        ]}
        style={[props.styles?.root, props.style, attrs.style as StyleValue]}
      >
        <div
          ref={scrollBoxRef}
          class={[
            `${listPrefixCls.value}-scroll-box`,
            props.classes?.scroll,
            { [`${listPrefixCls.value}-autoscroll`]: props.autoScroll },
          ]}
          style={props.styles?.scroll}
          onScroll={handleScroll}
        >
          <div class={`${listPrefixCls.value}-scroll-content`}>
            {mergedItems.value.map(item => {
              const {
                key,
                role,
                status,
                extraInfo,
                styles,
                classes,
                rootClassName,
                class: itemClass,
                style: itemStyle,
                ...rest
              } = item;

              const roleRootClassName =
                role === "divider"
                  ? bubbleClassNames.value.divider
                  : role === "system"
                    ? bubbleClassNames.value.system
                    : bubbleClassNames.value.bubble;

              const roleRootStyle =
                role === "divider"
                  ? bubbleStyles.value.divider
                  : role === "system"
                    ? bubbleStyles.value.system
                    : bubbleStyles.value.bubble;

              const mergedClassNames = {
                ...bubbleClassNames.value.rest,
                ...classes,
              };

              const mergedStyles = {
                ...bubbleStyles.value.rest,
                ...styles,
              };

              const commonProps = {
                key,
                ref: setBubbleRef(key),
                prefixCls: props.prefixCls,
                content: (item as Record<string, any>).content,
                rootClassName: rootClassName || roleRootClassName,
                style: itemStyle || roleRootStyle,
                class: itemClass,
                classes: mergedClassNames,
                styles: mergedStyles,
                ...(rest as object),
              };

              if (role === "divider") return <DividerBubble {...commonProps} />;

              if (role === "system") return <SystemBubble {...commonProps} />;

              return (
                <Bubble {...commonProps} info={{ key, status, extraInfo }} />
              );
            })}
          </div>
        </div>
      </div>
    );
  },
});

export default XBubbleList;
