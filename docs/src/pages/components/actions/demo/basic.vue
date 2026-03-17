<docs lang="zh-CN">
基础用法。
</docs>

<docs lang="en-US">
Basic usage.
</docs>

<script setup lang="ts">
import type { ActionsProps } from "@antdv-next/x";

import { EditOutlined, RedoOutlined } from "@antdv-next/icons";
import { Actions } from "@antdv-next/x";
import { message } from "antdv-next";
import { h } from "vue";

const items: ActionsProps["items"] = [
  {
    key: "retry",
    icon: h(RedoOutlined),
    label: "Retry",
  },
  {
    key: "edit",
    icon: h(EditOutlined),
    label: "Edit",
  },
];

const onClick: ActionsProps["onClick"] = ({ keyPath }) => {
  message.success(`you clicked ${keyPath.join(",")}`);
};
</script>

<template>
  <Actions :items="items" :on-click="onClick" />
</template>
