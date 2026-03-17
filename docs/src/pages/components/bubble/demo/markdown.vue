<script setup lang="ts">
import { RedoOutlined } from "@antdv-next/icons";
import { Bubble } from "@antdv-next/x";
import { Button, Space, Typography } from "antdv-next";
import MarkdownIt from "markdown-it";
import { computed, h, ref } from "vue";

const source = `
> Render as markdown content to show rich text!

Link: [Ant Design X](https://x.ant.design)
`.trim();

const index = ref(source.length);
const md = new MarkdownIt({ html: false, linkify: true, typographer: true });

const content = computed(() => source.slice(0, index.value));

function renderMarkdown(value: string) {
  return h("div", {
    style: {
      whiteSpace: "normal",
      lineHeight: 1.7,
    },
    innerHTML: md.render(value),
  });
}

function rerender() {
  index.value = 1;
  const timer = setInterval(() => {
    index.value += 5;
    if (index.value >= source.length) clearInterval(timer);
  }, 20);
}
</script>

<template>
  <Space direction="vertical" style="display: flex; width: 100%" :size="10">
    <Space>
      <Button type="primary" @click="rerender">
        <RedoOutlined />
        rerender
      </Button>
    </Space>
    <Typography>
      <Bubble :content="content" :content-render="renderMarkdown" />
    </Typography>
  </Space>
</template>

<docs lang="zh-CN">
配合 `x-markdown` 实现自定义渲染内容。
</docs>

<docs lang="en-US">
Cooperate with `x-markdown` to achieve customized rendering content.
</docs>
