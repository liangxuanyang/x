import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vite-plus/test";

import ActionsItem from "../ActionsItem";

describe("ActionsItem", () => {
  it("renders default icon without status", () => {
    const wrapper = mount(ActionsItem, {
      props: {
        defaultIcon: "default-icon",
      },
    });

    expect(wrapper.text()).toContain("default-icon");
  });

  it("falls back to default icon for unknown status", () => {
    const wrapper = mount(ActionsItem, {
      props: {
        defaultIcon: "default-icon",
        status: "unknown" as any,
      },
    });

    expect(wrapper.text()).toContain("default-icon");
  });
});
