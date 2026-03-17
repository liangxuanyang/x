import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vite-plus/test";
import { h, nextTick } from "vue";

import Bubble from "../Bubble";

describe("Bubble", () => {
  it("handles common props and expose ref", () => {
    const wrapper = mount(Bubble, {
      props: {
        prefixCls: "custom-bubble",
        rootClassName: "root-class",
        class: "custom-class",
        style: { margin: "10px" },
        classes: { content: "content-class" },
        styles: { content: { color: "red" } },
        placement: "end",
        content: "测试内容",
        variant: "outlined",
        shape: "round",
        loading: false,
        typing: false,
        editable: false,
        streaming: false,
        footerPlacement: "inner-start",
        avatar: h("div", { class: "custom-avatar" }, "头像"),
        header: h("div", { class: "custom-header" }, "头部"),
        footer: h("div", { class: "custom-footer" }, "底部"),
        extra: h("div", { class: "custom-extra" }, "附加"),
      },
    });

    expect(wrapper.find(".custom-bubble").exists()).toBe(true);
    expect(wrapper.find(".root-class").exists()).toBe(true);
    expect(wrapper.find(".custom-class").exists()).toBe(true);
    expect(wrapper.find(".content-class").exists()).toBe(true);
    expect(wrapper.find(".custom-avatar").exists()).toBe(true);
    expect(wrapper.find(".custom-header").exists()).toBe(true);
    expect(wrapper.find(".custom-footer").exists()).toBe(true);
    expect(wrapper.find(".custom-extra").exists()).toBe(true);
    expect((wrapper.vm as any).nativeElement).toBeInstanceOf(HTMLElement);
  });

  it("supports function slot props", () => {
    const wrapper = mount(Bubble, {
      props: {
        content: "Test",
        header: content =>
          h("div", { class: "header-fn" }, `Header: ${content}`),
      },
    });

    expect(wrapper.find(".header-fn").exists()).toBe(true);
    expect(wrapper.text()).toContain("Header: Test");
  });

  it("supports footer placement", () => {
    const wrapper = mount(Bubble, {
      props: {
        content: "Test",
        footerPlacement: "inner-start",
        footer: h("div", "Footer"),
      },
    });

    expect(wrapper.find(".antdx-bubble-footer-start").exists()).toBe(true);
  });

  it("shows loading state and custom loading render", () => {
    const wrapper = mount(Bubble, {
      props: {
        content: "Test",
        loading: true,
      },
    });

    expect(wrapper.find(".antdx-bubble-loading").exists()).toBe(true);
    expect(wrapper.find(".antdx-bubble-dot").exists()).toBe(true);

    const customLoading = mount(Bubble, {
      props: {
        content: "Test",
        loading: true,
        loadingRender: () =>
          h("div", { class: "custom-loading" }, "Loading..."),
      },
    });

    expect(customLoading.find(".custom-loading").exists()).toBe(true);
  });

  it("applies variants and shapes", async () => {
    const wrapper = mount(Bubble, {
      props: {
        content: "Test",
        variant: "filled",
        shape: "default",
      },
    });

    expect(wrapper.find(".antdx-bubble-content-filled").exists()).toBe(true);
    expect(wrapper.find(".antdx-bubble-content-default").exists()).toBe(true);

    await wrapper.setProps({ variant: "outlined", shape: "round" });
    expect(wrapper.find(".antdx-bubble-content-outlined").exists()).toBe(true);
    expect(wrapper.find(".antdx-bubble-content-round").exists()).toBe(true);

    await wrapper.setProps({ variant: "shadow", shape: "corner" });
    expect(wrapper.find(".antdx-bubble-content-shadow").exists()).toBe(true);
    expect(wrapper.find(".antdx-bubble-content-corner").exists()).toBe(true);

    await wrapper.setProps({ variant: "borderless" });
    expect(wrapper.find(".antdx-bubble-content-borderless").exists()).toBe(
      true,
    );
  });

  it("applies placement", async () => {
    const wrapper = mount(Bubble, {
      props: {
        content: "Test",
        placement: "start",
      },
    });

    expect(wrapper.find(".antdx-bubble-start").exists()).toBe(true);

    await wrapper.setProps({ placement: "end" });
    expect(wrapper.find(".antdx-bubble-end").exists()).toBe(true);
  });

  it("supports contentRender with object content", () => {
    const complexContent = {
      type: "message",
      text: "Complex",
    };

    const wrapper = mount(Bubble, {
      props: {
        content: complexContent as any,
        contentRender: (content: any) =>
          h(
            "div",
            { class: "complex-render" },
            `${content.type}: ${content.text}`,
          ),
      },
    });

    expect(wrapper.find(".complex-render").exists()).toBe(true);
    expect(wrapper.text()).toContain("message: Complex");
  });

  it("calls onTypingComplete when typing is disabled", async () => {
    const onTypingComplete = vi.fn();

    mount(Bubble, {
      props: {
        content: "Hello",
        onTypingComplete,
      },
    });

    await nextTick();
    expect(onTypingComplete).toHaveBeenCalledWith("Hello");
  });

  it("adds info status class", () => {
    const wrapper = mount(Bubble, {
      props: {
        content: "Status content",
        info: { status: "error" as any },
      },
    });

    expect(wrapper.find(".antdx-bubble-error").exists()).toBe(true);
  });

  it("throws for non-string content in editable mode", () => {
    expect(() => {
      mount(Bubble, {
        props: {
          content: h("div", "Not string") as any,
          editable: { editing: true },
          onEditConfirm: vi.fn(),
        },
      });
    }).toThrow("[Bubble] Editable mode only supports string content.");
  });
});
