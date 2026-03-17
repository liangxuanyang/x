<script setup lang="ts">
import { EditOutlined, UserOutlined } from "@antdv-next/icons";
import { Actions, Bubble } from "@antdv-next/x";
import { Avatar, Space } from "antdv-next";
import { h, ref } from "vue";

const contentA = ref("editable bubble 1");
const contentB = ref("editable bubble 2");
const editingA = ref(false);
const editingB = ref(false);
const editItems = [
  {
    key: "edit",
    icon: h(EditOutlined),
    label: "edit",
  },
];

const avatar = h(Avatar, { size: "small", icon: h(UserOutlined) });

function footerA() {
  return h(Actions, {
    items: editItems,
    onClick: ({ key }) => {
      editingA.value = key === "edit";
    },
  });
}

function footerB() {
  return h(Actions, {
    items: editItems,
    onClick: ({ key }) => {
      editingB.value = key === "edit";
    },
  });
}
</script>

<template>
  <Space direction="vertical" style="display: flex; width: 100%" :size="10">
    <Bubble
      :editable="editingA"
      :content="contentA"
      :avatar="avatar"
      :footer="footerA"
      :on-edit-cancel="() => (editingA = false)"
      :on-edit-confirm="
        value => {
          contentA = value;
          editingA = false;
        }
      "
    />

    <Bubble
      placement="end"
      :editable="{ editing: editingB, okText: 'ok', cancelText: 'cancel' }"
      :content="contentB"
      :avatar="avatar"
      :footer="footerB"
      :on-edit-cancel="() => (editingB = false)"
      :on-edit-confirm="
        value => {
          contentB = value;
          editingB = false;
        }
      "
    />
  </Space>
</template>

<docs lang="zh-CN">
可编辑气泡，支持 `string` 类型 `content` 的简单编辑，使用时应该在 `onEditing` 处进行 **_XSS_** 防护。
</docs>

<docs lang="en-US">
Editable bubble, support simple editing of `string` type `content`, and should be protected by **_XSS_** in `onEditing` when used.
</docs>
