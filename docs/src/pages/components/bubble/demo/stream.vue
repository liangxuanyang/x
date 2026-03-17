<script setup lang="ts">
import { RedoOutlined, UserOutlined } from "@antdv-next/icons";
import { Bubble } from "@antdv-next/x";
import { Avatar, Button, Divider, Space, Switch, Typography } from "antdv-next";
import { computed, h, onBeforeUnmount, ref } from "vue";

const text =
  "Ant Design X - Better UI toolkit for your AI Chat WebApp. ".repeat(5);
const loading = ref(true);
const source = ref("");
const streamContent = ref("");
const streaming = ref(false);
const typing = ref(false);
const disableStreaming = ref(false);
const count = ref(0);
let timer: ReturnType<typeof setInterval> | null = null;

const bubbleStreaming = computed(() =>
  disableStreaming.value ? false : streaming.value,
);

function clearTimer() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}

function clear() {
  clearTimer();
  loading.value = false;
  source.value = "";
  streamContent.value = "";
  streaming.value = false;
}

function start(step: number, interval: number) {
  clearTimer();
  loading.value = false;
  count.value = 0;
  source.value = `${Math.floor(Math.random() * 10)} - ${text}`;
  streamContent.value = "";
  streaming.value = true;

  timer = setInterval(() => {
    const nextLen = streamContent.value.length + step;
    if (nextLen < source.value.length) {
      streamContent.value = source.value.slice(0, nextLen);
      return;
    }

    streamContent.value = source.value;
    streaming.value = false;
    clearTimer();
  }, interval);
}

onBeforeUnmount(() => clearTimer());
</script>

<template>
  <Space direction="vertical" style="display: flex; width: 100%" :size="10">
    <Space align="center" wrap>
      <span>Streaming data:</span>
      <Button type="primary" @click="start(2, 100)">
        <RedoOutlined />
        load slowly
      </Button>
      <Button @click="start(10, 50)">
        <RedoOutlined />
        load quickly
      </Button>
      <Button type="link" @click="clear"> clear </Button>
    </Space>

    <Space align="center">
      <span>Force close streaming:</span>
      <Switch v-model:checked="disableStreaming" />
    </Space>

    <Space align="center">
      <span>Enable typing animation:</span>
      <Switch v-model:checked="typing" />
    </Space>

    <Space align="center">
      <span>onTypingComplete trigger times:</span>
      <Typography.Text type="danger">
        {{ count }}
      </Typography.Text>
    </Space>

    <Divider style="margin: 4px 0" />

    <Bubble
      :loading="loading"
      :content="streamContent"
      :streaming="bubbleStreaming"
      :typing="
        typing
          ? { effect: 'typing', step: 5, interval: 50, keepPrefix: true }
          : false
      "
      header="ADX"
      :avatar="h(Avatar, { size: 'small', icon: h(UserOutlined) })"
      :on-typing-complete="
        () => {
          count += 1;
        }
      "
    />
  </Space>
</template>

<docs lang="zh-CN">
流式传输。可以传递 `streaming` 来通知 Bubble 当前的 `content` 是否属于流式输入的。
</docs>

<docs lang="en-US">
Stream. `streaming` can be passed to tell Bubble if the current `content` is a streaming input.
</docs>
