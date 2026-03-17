import { fileURLToPath } from "node:url";
import { configDefaults, defineConfig, mergeConfig } from "vite-plus";

import viteConfig from "./docs/vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    resolve: {
      alias: {
        "dayjs/plugin/advancedFormat": "dayjs/plugin/advancedFormat.js",
        "dayjs/plugin/customParseFormat": "dayjs/plugin/customParseFormat.js",
        "dayjs/plugin/localeData": "dayjs/plugin/localeData.js",
        "dayjs/plugin/weekday": "dayjs/plugin/weekday.js",
        "dayjs/plugin/weekOfYear": "dayjs/plugin/weekOfYear.js",
        "dayjs/plugin/weekYear": "dayjs/plugin/weekYear.js",
      },
    },
    test: {
      environment: "jsdom",
      exclude: [...configDefaults.exclude, "e2e/**"],
      root: fileURLToPath(new URL("./", import.meta.url)),
      server: {
        deps: {
          inline: ["antdv-next", "@v-c/picker", "dayjs"],
        },
      },
    },
  }),
);
