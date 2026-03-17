<script setup lang="ts">
import { CopyOutlined, UserOutlined } from "@antdv-next/icons";
import { Bubble } from "@antdv-next/x";
import { Avatar, Button, Space, Tooltip } from "antdv-next";
import { h } from "vue";

function mainSide() {
  return h(
    Tooltip,
    { title: "main side" },
    {
      default: () => h(Avatar, { size: "small", icon: h(UserOutlined) }),
    },
  );
}

function extraSide() {
  return h(
    Tooltip,
    { title: "extra side" },
    {
      default: () =>
        h(
          Button,
          { type: "text", size: "small" },
          {
            default: () => h(CopyOutlined),
          },
        ),
    },
  );
}
</script>

<template>
  <Space direction="vertical" style="display: flex; width: 100%" :size="10">
    <Bubble content="align left" :avatar="mainSide" :extra="extraSide" />
    <Bubble
      content="align right"
      placement="end"
      :avatar="mainSide"
      :extra="extraSide"
    />
  </Space>
</template>

<docs lang="zh-CN">
气泡边栏与位置，位置 `placement` 会改变主次侧栏的位置。
</docs>

<docs lang="en-US">
Bubble sidebar and placement, `placement` will change the position of the primary and secondary sidebars.
</docs>
