<script setup lang="ts">
import { AntDesignOutlined, RedoOutlined } from "@antdv-next/icons";
import { Actions, Bubble } from "@antdv-next/x";
import { Avatar } from "antdv-next";
import { h } from "vue";

const avatarNode = h(Avatar, { size: "small", icon: h(AntDesignOutlined) });

function actionItems(content: string) {
  return [
    {
      key: "copy",
      label: "copy",
      actionRender: () => h(Actions.Copy, { text: content }),
    },
    {
      key: "retry",
      icon: h(RedoOutlined),
      label: "Retry",
    },
  ];
}

function footerRenderer(content: string) {
  return h(Actions, { items: actionItems(content) });
}

const text = "Hello World\nNext line\nTab\tindent";
</script>

<template>
  <Bubble
    :content="text"
    :typing="{ effect: 'fade-in' }"
    header="Ant Design X"
    :avatar="avatarNode"
    :footer="footerRenderer"
  />
</template>

<docs lang="zh-CN">
基础用法。
</docs>

<docs lang="en-US">
Basic usage.
</docs>
