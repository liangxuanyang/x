<script setup lang="ts">
import { App, theme } from "antdv-next";

import { useAppContext } from "@/composables/use-app-context";
import { useGlobalToken } from "@/composables/use-global-token";

defineOptions({
  name: "AppContextRegister",
});
const { token } = theme.useToken();
const globalToken = useGlobalToken();
watchEffect(() => {
  globalToken.token.value = token.value;
});
const { notification, message, modal } = App.useApp();
const { registerApp } = useAppContext();
registerApp({
  notification,
  message,
  modal,
});
</script>

<template>
  <slot />
</template>
