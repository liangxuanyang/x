<script setup lang="ts">
import { Bubble } from "@antdv-next/x";
import { Space, Typography } from "antdv-next";
import { h } from "vue";

const text = "Hello, this is a system message";
</script>

<template>
  <Space direction="vertical" style="display: flex; width: 100%" :size="14">
    <Bubble.System :content="text" />

    <Bubble.System
      variant="outlined"
      shape="round"
      :content="[text, ' ', h(Typography.Link, null, { default: () => 'ok' })]"
    />

    <Bubble.System
      variant="borderless"
      :content="[
        text,
        ' ',
        h(Typography.Link, null, { default: () => 'cancel' }),
      ]"
    />
  </Space>
</template>

<docs lang="zh-CN">
系统信息 Bubble。
</docs>

<docs lang="en-US">
Bubble of system information.
</docs>
