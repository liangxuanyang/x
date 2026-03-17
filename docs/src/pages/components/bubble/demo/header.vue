<script setup lang="ts">
import { UserOutlined } from "@antdv-next/icons";
import { Bubble } from "@antdv-next/x";
import { Avatar, Space } from "antdv-next";
import { h } from "vue";

const avatarNode = h(Avatar, { size: "small", icon: h(UserOutlined) });
</script>

<template>
  <Space direction="vertical" style="display: flex; width: 100%" :size="10">
    <Bubble content="align left" header="header" :avatar="avatarNode" />
    <Bubble
      content="align right"
      placement="end"
      header="header"
      :avatar="avatarNode"
    />
  </Space>
</template>

<docs lang="zh-CN">
气泡头部，位置 `placement` 会改变头部的对齐方式。
</docs>

<docs lang="en-US">
Bubble header, `placement` will change the alignment of the header.
</docs>
