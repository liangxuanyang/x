export {};

declare module "vue" {
  export interface GlobalComponents {
    XBubble: (typeof import("./dist/bubble"))["XBubble"];
    XBubbleList: (typeof import("./dist/bubble"))["XBubbleList"];
    XBubbleSystem: (typeof import("./dist/bubble"))["XBubbleSystem"];
    XBubbleDivider: (typeof import("./dist/bubble"))["XBubbleDivider"];
  }
}
