<script setup lang="ts">
import { useLocale } from "@/composables/use-locale";

import GroupMaskLayer from "./group-mask-layer.vue";
import LuminousBg from "./luminous-bg.vue";

const { t } = useLocale();
</script>

<template>
  <GroupMaskLayer>
    <div class="antdv-home-preview-banner-holder">
      <LuminousBg />

      <a-typography
        component="article"
        class="antdv-home-preview-banner-typography"
      >
        <h1 class="antdv-home-preview-banner-title">Antd Next X</h1>
        <p class="antdv-home-preview-banner-desc">
          {{ t("home.desc") }}
        </p>
      </a-typography>

      <a-flex gap="large" class="antdv-home-preview-banner-buttons">
        <a-button class="antdv-home-banner-btn start-btn" href="/docs">
          {{ t("home.start") }}
        </a-button>
        <a-button
          class="antdv-home-banner-btn design-btn"
          href="https://github.com/antdv-next/antdv-next-x"
          target="_blank"
        >
          {{ t("home.design") }}
        </a-button>
      </a-flex>

      <div class="antdv-home-preview-banner-child" />
    </div>
  </GroupMaskLayer>
</template>

<style scoped>
.antdv-home-preview-banner-holder {
  height: 100vh;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  perspective: 800px;
  transform: translateZ(1000px);
  font-family:
    AlibabaPuHuiTi,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    "Helvetica Neue",
    Arial,
    "Noto Sans",
    sans-serif,
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol",
    "Noto Color Emoji";
}

.antdv-home-preview-banner-typography {
  text-align: center;
  position: relative;
  z-index: 1;
  padding-inline: var(--ant-padding-xl);
  text-shadow:
    0 0 4px var(--ant-color-bg-container),
    0 0 4px var(--ant-color-bg-container),
    0 0 4px var(--ant-color-bg-container),
    0 0 4px var(--ant-color-bg-container),
    0 0 4px var(--ant-color-bg-container);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.antdv-home-preview-banner-title {
  font-weight: 900 !important;
  font-size: 80px !important;
  line-height: 1.3 !important;
  margin-bottom: 0 !important;
}

.antdv-home-preview-banner-desc {
  font-size: 16px !important;
  font-weight: 400 !important;
  margin-bottom: 48px !important;
  color: var(--ant-color-text);
  opacity: 0.65;
  max-width: 500px;
}

.antdv-home-preview-banner-buttons {
  position: relative;
  z-index: 1;
  margin-bottom: var(--ant-margin-xl);
}

.antdv-home-banner-btn {
  height: 56px;
  border: none;
  border-radius: 40px;
  padding: 0 40px;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.start-btn {
  background: var(--ant-color-primary);
  color: #fff;
}

.start-btn:hover {
  opacity: 0.9;
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.design-btn {
  background: transparent;
  border: 1px solid var(--ant-color-primary);
  color: var(--ant-color-primary);
}

.design-btn:hover {
  background: var(--ant-color-primary-bg);
  color: var(--ant-color-primary);
  border-color: var(--ant-color-primary);
  transform: translateY(-2px);
}

.antdv-home-preview-banner-child {
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  z-index: 1;
}

@media only screen and (max-width: 768px) {
  .antdv-home-preview-banner-title {
    font-size: 54px !important;
  }

  .antdv-home-banner-btn {
    padding: 0 24px;
  }
}
</style>
