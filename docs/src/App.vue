<script setup lang="ts">
import AppProvider from "@/components/providers/app-provider.vue";
import { useAppStore } from "@/stores/app";

const appStore = useAppStore();
appStore.init();
</script>

<template>
  <AppProvider>
    <router-view />
  </AppProvider>
</template>
