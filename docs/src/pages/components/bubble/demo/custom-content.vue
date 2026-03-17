<script setup lang="ts">
import { Bubble } from "@antdv-next/x";
import { Button, Image, Space, Typography } from "antdv-next";
import { h, ref } from "vue";

interface CustomContent {
  imageUrl: string;
  text: string;
  actionLabel: string;
}

const content = ref<CustomContent>({
  imageUrl:
    "https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*eco6RrQhxbMAAAAAAAAAAAAADgCCAQ/original",
  text: "Ant Design X",
  actionLabel: "Click Me",
});

function updateAction() {
  content.value = {
    ...content.value,
    actionLabel: "Happy Ant Design X!",
  };
}

function contentRender(value: any) {
  return h(
    Space,
    { align: "center", size: 10 },
    {
      default: () => [
        h(Image, { width: 52, src: value.imageUrl, preview: false }),
        h(
          Typography.Text,
          { strong: true },
          {
            default: () => value.text,
          },
        ),
      ],
    },
  );
}

function footerRender(value: any) {
  return h(
    Button,
    {
      type: "text",
      size: "small",
      onClick: updateAction,
    },
    {
      default: () => value.actionLabel,
    },
  );
}
</script>

<template>
  <Bubble
    :content="content"
    :content-render="contentRender"
    :footer="footerRender"
  />
</template>

<docs lang="zh-CN">
自定义渲染内容。
</docs>

<docs lang="en-US">
Custom rendering content.
</docs>
