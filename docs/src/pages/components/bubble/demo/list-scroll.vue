<script setup lang="ts">
import type { BubbleListProps } from "@antdv-next/x";

import {
  AntDesignOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined,
  CopyOutlined,
  RedoOutlined,
  UserOutlined,
} from "@antdv-next/icons";
import { Actions, Bubble } from "@antdv-next/x";
import { Avatar, Button, Space } from "antdv-next";
import { h, ref } from "vue";

let seed = 0;
const nextKey = () => `bubble_${seed++}`;

function genItem(isAI: boolean, repeat = 20): any {
  return {
    key: nextKey(),
    role: isAI ? "ai" : "user",
    content: `${seed}: ${isAI ? "Mock AI content ".repeat(repeat) : "Mock user content."}`,
    typing: false,
  };
}

const listRef = ref<any>(null);
const items = ref<any[]>(
  Array.from({ length: 11 }, (_, index) => genItem(index % 2 === 1)),
);
const actionItems = [
  {
    key: "retry",
    icon: h(RedoOutlined),
    label: "Retry",
  },
  {
    key: "copy",
    icon: h(CopyOutlined),
    label: "Copy",
  },
];

const role: BubbleListProps["role"] = {
  ai: {
    typing: true,
    header: "AI",
    avatar: () => h(Avatar, { size: "small", icon: h(AntDesignOutlined) }),
    footer: () => h(Actions, { items: actionItems }),
  },
  user: {
    placement: "end",
    typing: false,
    header: "User",
    avatar: () => h(Avatar, { size: "small", icon: h(UserOutlined) }),
  },
};

function addLongBubble() {
  const isAI = !!(items.value.length % 2);
  items.value = [...items.value, genItem(isAI, 100)];
}

function scrollTop() {
  listRef.value?.scrollTo({ top: "top" });
}

function scrollBottomSmooth() {
  listRef.value?.scrollTo({ top: "bottom", behavior: "smooth" });
}

function scrollBottomInstant() {
  listRef.value?.scrollTo({ top: "bottom", behavior: "instant" });
}

function scrollRandom() {
  const native = listRef.value?.scrollBoxNativeElement;
  if (!native) return;

  listRef.value?.scrollTo({
    top: Math.random() * native.scrollHeight,
  });
}

function scrollSecond() {
  if (items.value.length < 2) return;
  listRef.value?.scrollTo({ key: items.value[1]?.key, block: "nearest" });
}

function scrollLast() {
  const last = items.value.at(-1);
  if (!last) return;
  listRef.value?.scrollTo({ key: last.key, block: "end" });
}
</script>

<template>
  <Space
    direction="vertical"
    style="display: flex; width: 100%; height: 720px"
    :size="10"
  >
    <Space wrap>
      <Button type="primary" @click="addLongBubble">
        <RedoOutlined />
        Add Long Bubble
      </Button>
      <Button @click="scrollTop">
        <ArrowUpOutlined />
        Scroll To Top
      </Button>
      <Button @click="scrollBottomSmooth">
        <ArrowDownOutlined />
        Scroll To Bottom smooth
      </Button>
      <Button @click="scrollBottomInstant">
        <ArrowDownOutlined />
        Scroll To Bottom instant
      </Button>
      <Button @click="scrollRandom"> Scroll To Random </Button>
      <Button @click="scrollSecond"> Scroll To Second Bubble </Button>
      <Button @click="scrollLast"> Scroll To Last Bubble </Button>
    </Space>

    <div style="display: flex; flex: 1; min-height: 0">
      <Bubble.List ref="listRef" :role="role" :items="items" />
    </div>
  </Space>
</template>

<docs lang="zh-CN">
可以使用 `ref` 控制列表滚动条。当 **Bubble.List** 内容在不断增长且通过 `ref.scrollTo` 跳转到底部时，`behavior: 'smooth'` 的行为会被 `behavior: 'instant'` 替代。
</docs>

<docs lang="en-US">
Bubble.List ref. `behavior: 'smooth'` would be replaced by `behavior: 'instant'` when the content of **Bubble.List** growing constantly and you jump to the bottom using `ref.scrollTo`.
</docs>
