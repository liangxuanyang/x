<script setup lang="ts">
import DocHeader from "@/layouts/docs/components/doc-header.vue";

import PreviewBanner from "./components/preview-banner/index.vue";
</script>

<template>
  <div class="antdv-home-page min-h-100vh">
    <DocHeader class="fixed!" />
    <section>
      <PreviewBanner />
    </section>
  </div>
</template>

<style>
.antdv-home-design-framework-decoration-image {
  position: absolute;
  inset-inline-start: 0;
  top: -50px;
  height: 160px;
}
</style>
