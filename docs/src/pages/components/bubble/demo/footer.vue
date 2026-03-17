<script setup lang="ts">
import { CopyOutlined, RedoOutlined, UserOutlined } from "@antdv-next/icons";
import { Actions, Bubble } from "@antdv-next/x";
import { Avatar, Space } from "antdv-next";
import { h } from "vue";

const avatarNode = h(Avatar, { size: "small", icon: h(UserOutlined) });
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

function footerNode() {
  return h(Actions, { items: actionItems });
}
</script>

<template>
  <Space direction="vertical" style="display: flex; width: 100%" :size="10">
    <Bubble
      content="outer footer"
      header="footer"
      :avatar="avatarNode"
      :footer="footerNode"
    />
    <Bubble
      content="inner footer"
      placement="end"
      footer-placement="inner-end"
      header="footer"
      :avatar="avatarNode"
      :footer="footerNode"
    />
    <Bubble
      content="outer footer and align right"
      footer-placement="outer-end"
      header="footer"
      :avatar="avatarNode"
      :footer="footerNode"
    />
    <Bubble
      content="inner footer and align left"
      placement="end"
      footer-placement="inner-start"
      header="footer"
      :avatar="avatarNode"
      :footer="footerNode"
    />
  </Space>
</template>

<docs lang="zh-CN">
气泡尾部，不受 `placement` 影响，需要通过 `footerPlacement` 来控制尾部的渲染位置。
</docs>

<docs lang="en-US">
Bubble footer, not affected by `placement`, use `footerPlacement` to control the rendering position of the footer.
</docs>
