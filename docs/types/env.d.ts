/// <reference types="vite-plus/client" />
/// <reference types="antdv-next/global" />
/// <reference types="../../packages/x/global.d.ts" />

// Vite+ expect error when importing .vue files without this declaration.
declare module "*.vue" {
  import type { DefineComponent } from "vue";

  const component: DefineComponent<{}, {}, any>;
  export default component;
}
