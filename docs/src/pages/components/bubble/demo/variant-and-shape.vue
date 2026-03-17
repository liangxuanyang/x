<script setup lang="ts">
import { Bubble } from "@antdv-next/x";
import { Space } from "antdv-next";
</script>

<template>
  <Space direction="vertical" style="display: flex; width: 100%" :size="10">
    <Space wrap>
      <Bubble content="filled - default" />
      <Bubble content="filled - round" shape="round" />
      <Bubble content="filled - corner left" shape="corner" />
      <Bubble content="filled - corner right" shape="corner" placement="end" />
    </Space>

    <Space wrap>
      <Bubble content="outlined - default" variant="outlined" />
      <Bubble content="outlined - round" variant="outlined" shape="round" />
      <Bubble
        content="outlined - corner left"
        variant="outlined"
        shape="corner"
      />
      <Bubble
        content="outlined - corner right"
        variant="outlined"
        shape="corner"
        placement="end"
      />
    </Space>

    <Space wrap>
      <Bubble content="shadow - default" variant="shadow" />
      <Bubble content="shadow - round" variant="shadow" shape="round" />
      <Bubble content="shadow - corner left" variant="shadow" shape="corner" />
      <Bubble
        content="shadow - corner right"
        variant="shadow"
        shape="corner"
        placement="end"
      />
    </Space>

    <Space wrap>
      <Bubble variant="borderless" content="borderless bubble" />
    </Space>
  </Space>
</template>

<docs lang="zh-CN">
变体与形状，无边框样式 `borderless` 的 Bubble 适用于渲染自定义样式的内容。
</docs>

<docs lang="en-US">
variant and shape, `borderless` Bubble is suitable for rendering custom-styled content.
</docs>
