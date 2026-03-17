<script setup lang="ts">
import { Bubble } from "@antdv-next/x";
import { Space, Switch } from "antdv-next";
import { ref } from "vue";

const loading = ref(true);
</script>

<template>
  <Space direction="vertical" style="display: flex; width: 100%">
    <Bubble :loading="loading" content="hello world !" />
    <Space>
      <span>Loading state:</span>
      <Switch v-model:checked="loading" />
    </Space>
  </Space>
</template>

<docs lang="zh-CN">
通过 `loading` 属性控制加载状态。
</docs>

<docs lang="en-US">
Control the loading state by `loading` prop.
</docs>
