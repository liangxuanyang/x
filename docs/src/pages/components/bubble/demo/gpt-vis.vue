<script setup lang="ts">
import { RedoOutlined } from "@antdv-next/icons";
import { Bubble } from "@antdv-next/x";
import { Button, Space } from "antdv-next";
import MarkdownIt from "markdown-it";
import { computed, h, onBeforeUnmount, ref } from "vue";

const text = `
**GPT-Vis**, Components for GPTs, generative AI, and LLM projects.

Here is a simple sales trend:

<custom-line data-axis-x-title="year" data-axis-y-title="sale">[{"time":2018,"value":91.9},{"time":2019,"value":99.1},{"time":2020,"value":101.6},{"time":2021,"value":114.4},{"time":2022,"value":121}]</custom-line>
`.trim();

const md = new MarkdownIt({ html: false, linkify: true, typographer: true });
const index = ref(0);
let timer: ReturnType<typeof setInterval> | null = null;

const content = computed(() => text.slice(0, index.value));

const chartData = computed(() => {
  const match = content.value.match(
    /<custom-line[^>]*>([\s\S]*?)<\/custom-line>/,
  );
  if (!match?.[1]) return [];

  try {
    const data = JSON.parse(match[1]);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
});

const chartPoints = computed(() => {
  if (!chartData.value.length) return "";

  const minX = Math.min(
    ...chartData.value.map((item: any) => Number(item.time) || 0),
  );
  const maxX = Math.max(
    ...chartData.value.map((item: any) => Number(item.time) || 0),
  );
  const minY = Math.min(
    ...chartData.value.map((item: any) => Number(item.value) || 0),
  );
  const maxY = Math.max(
    ...chartData.value.map((item: any) => Number(item.value) || 0),
  );

  const width = 860;
  const height = 240;
  const padding = 20;

  return chartData.value
    .map((item: any) => {
      const xRatio =
        maxX === minX ? 0 : (Number(item.time) - minX) / (maxX - minX);
      const yRatio =
        maxY === minY ? 0 : (Number(item.value) - minY) / (maxY - minY);
      const x = padding + xRatio * (width - padding * 2);
      const y = height - padding - yRatio * (height - padding * 2);
      return `${x},${y}`;
    })
    .join(" ");
});

function rerender() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }

  index.value = 1;
  timer = setInterval(() => {
    index.value += 6;
    if (index.value >= text.length) {
      index.value = text.length;
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }
  }, 20);
}

function contentRender(value: string) {
  const normalized = value.replace(
    /<custom-line[^>]*>[\s\S]*?<\/custom-line>/g,
    "**Chart rendered below**",
  );
  const html = md.render(normalized);

  return h("div", { style: { whiteSpace: "normal" } }, [
    h("div", { innerHTML: html }),
    chartPoints.value
      ? h(
          "svg",
          {
            viewBox: "0 0 860 240",
            style: {
              width: "100%",
              maxWidth: "860px",
              border: "1px solid var(--ant-color-border-secondary)",
              borderRadius: "8px",
              padding: "8px",
            },
          },
          [
            h("polyline", {
              fill: "none",
              stroke: "var(--ant-color-primary)",
              "stroke-width": "3",
              points: chartPoints.value,
            }),
          ],
        )
      : null,
  ]);
}

onBeforeUnmount(() => {
  if (timer) clearInterval(timer);
});
</script>

<template>
  <Space
    direction="vertical"
    style="display: flex; width: 100%; max-height: 600px; overflow: auto"
    :size="10"
  >
    <Space style="display: flex; justify-content: flex-end; width: 100%">
      <Button @click="rerender">
        <RedoOutlined />
        Re-Render
      </Button>
    </Space>

    <Bubble
      :content="content"
      :content-render="contentRender"
      variant="outlined"
    />
  </Space>
</template>

<docs lang="zh-CN">
配合 `@antv/GPT-Vis` 实现大模型输出的图表渲染，支持模型流式输出。
</docs>

<docs lang="en-US">
Cooperate with `@antv/GPT-Vis` to achieve customized rendering chart of LLM stream output.
</docs>
