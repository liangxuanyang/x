<script setup lang="ts">
import type { ActionsProps } from "@antdv-next/x";

import {
  DeleteOutlined,
  EditOutlined,
  RedoOutlined,
  ShareAltOutlined,
} from "@antdv-next/icons";
import { Actions } from "@antdv-next/x";
import { message, Modal } from "antdv-next";
import { h } from "vue";

const items: ActionsProps["items"] = [
  {
    key: "retry",
    label: "Retry",
    icon: h(RedoOutlined),
  },
  {
    key: "edit",
    icon: h(EditOutlined),
    label: "Edit",
  },
  {
    key: "more",
    subItems: [
      {
        key: "share",
        label: "Share",
        icon: h(ShareAltOutlined),
      },
      {
        key: "import",
        label: "Import",
      },
      {
        key: "delete",
        label: "Delete",
        icon: h(DeleteOutlined),
        danger: true,
        onItemClick: () => {
          Modal.confirm({
            title: "Are you sure want to delete?",
            content: "Some descriptions",
            onOk() {
              message.success("Delete successfully");
            },
            onCancel() {
              message.info("Cancel");
            },
          });
        },
      },
    ],
  },
  {
    key: "clear",
    label: "Clear",
    icon: h(DeleteOutlined),
    danger: true,
  },
];

const onClick: ActionsProps["onClick"] = ({ keyPath }) => {
  message.success(`you clicked ${keyPath.join(",")}`);
};
</script>

<template>
  <Actions :items="items" :on-click="onClick" />
</template>

<docs lang="zh-CN">
通过设置 `subItems` 属性来展示更多菜单项，含有 `subItems` 的项可以不配置 icon，会默认使用 `<EllipsisOutlined />`
</docs>

<docs lang="en-US">
Display more menu items by setting the `subItems` property. Items with `subItems` don't need to configure an icon; `<EllipsisOutlined />` will be used by default.
</docs>
