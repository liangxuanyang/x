export const headerItems = [
  { key: "/docs", label: "研发" },
  { key: "/components", label: "组件" },
  { key: "/markdown", label: "Markdown" },
  { key: "/sdk", label: "SDK" },
  { key: "/skill", label: "Skill" },
  { key: "/demo", label: "演示" },
];

export const headerLocales: Record<
  string,
  Record<"zh-CN" | "en-US", string>
> = {
  "/docs": { "zh-CN": "研发", "en-US": "R&D" },
  "/components": { "zh-CN": "组件", "en-US": "Components" },
  "/markdown": { "zh-CN": "Markdown", "en-US": "Markdown" },
  "/sdk": { "zh-CN": "SDK", "en-US": "SDK" },
  "/skill": { "zh-CN": "Skill", "en-US": "Skill" },
  "/demo": { "zh-CN": "演示", "en-US": "Demos" },
};
