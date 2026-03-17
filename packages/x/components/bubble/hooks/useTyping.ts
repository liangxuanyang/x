import { computed, onBeforeUnmount, ref, watch } from "vue";

import type { BubbleAnimationOption, BubbleProps } from "../interface";

interface OutputData {
  text: string;
  id: string;
  done: boolean;
}

function getLcp(left: string, right: string) {
  const max = Math.min(left.length, right.length);
  let index = 0;
  while (index < max && left[index] === right[index]) index += 1;
  return left.slice(0, index);
}

function toUid() {
  return Math.random().toString(36).slice(2);
}

function getStep(step: number | [number, number]) {
  if (typeof step === "number") return step;
  const [min, max] = step;
  if (max <= min) return min;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function normalizeTypingOption(
  typing: boolean | BubbleAnimationOption | undefined,
) {
  if (!typing) return null;

  const base: Required<BubbleAnimationOption> = {
    effect: "fade-in",
    interval: 100,
    step: 6,
    keepPrefix: true,
  };

  if (typing === true) return base;

  const next: Required<BubbleAnimationOption> = {
    effect: typing.effect ?? base.effect,
    interval: typing.interval ?? base.interval,
    step: typing.step ?? base.step,
    keepPrefix: typing.keepPrefix ?? base.keepPrefix,
  };

  if (next.interval <= 0)
    throw new Error("[Bubble] `typing.interval` should be a positive number.");

  if (typeof next.step === "number") {
    if (next.step <= 0)
      throw new Error("[Bubble] `typing.step` should be a positive number.");
  } else {
    const [min, max] = next.step;
    if (min <= 0 || max <= 0 || min > max)
      throw new Error(
        "[Bubble] `typing.step` should be a valid positive range.",
      );
  }

  return next;
}

export function useTyping(params: {
  content: () => string;
  streaming: () => boolean;
  typing: () => boolean | BubbleAnimationOption | undefined;
  onTyping?: BubbleProps["onTyping"];
  onTypingComplete?: BubbleProps["onTypingComplete"];
}) {
  const renderedData = ref<OutputData[]>([]);
  const animating = ref(false);

  const animationCfg = computed(() => normalizeTypingOption(params.typing()));

  let timer: ReturnType<typeof setTimeout> | null = null;
  let taskId = 0;
  let renderedText = "";

  const stop = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  const setDone = () => {
    if (!renderedData.value.length) return;
    const last = renderedData.value.at(-1);
    if (!last || last.done) return;
    renderedData.value = [
      ...renderedData.value.slice(0, -1),
      { ...last, done: true },
    ];
  };

  const finish = (content: string) => {
    setDone();
    animating.value = false;
    if (!params.streaming()) params.onTypingComplete?.(content);
  };

  const runTyping = (reason: "content" | "streaming") => {
    const cfg = animationCfg.value;
    const content = params.content();
    if (!cfg || !content) {
      stop();
      animating.value = false;
      renderedText = content || "";
      renderedData.value = renderedText
        ? [{ id: toUid(), text: renderedText, done: true }]
        : [];
      return;
    }

    if (reason === "content") {
      const prefix = cfg.keepPrefix ? getLcp(content, renderedText) : "";
      renderedText = prefix;
      renderedData.value = prefix
        ? [{ id: toUid(), text: prefix, done: true }]
        : [];
    }

    if (renderedText === content) {
      finish(content);
      return;
    }

    stop();
    animating.value = true;
    const currentTask = ++taskId;

    const stepOnce = () => {
      if (currentTask !== taskId) return;

      const nextContent = params.content();
      const chunk = nextContent.slice(
        renderedText.length,
        renderedText.length + getStep(cfg.step),
      );

      if (!chunk) {
        if (params.streaming()) {
          timer = setTimeout(stepOnce, cfg.interval);
          return;
        }
        finish(nextContent);
        return;
      }

      renderedText += chunk;
      const currentEntry: OutputData = {
        id: toUid(),
        text: chunk,
        done: cfg.effect !== "fade-in",
      };
      renderedData.value = [...renderedData.value, currentEntry];
      params.onTyping?.(renderedText, nextContent);

      if (cfg.effect === "fade-in") {
        requestAnimationFrame(() => {
          setDone();
        });
      }

      timer = setTimeout(stepOnce, cfg.interval);
    };

    stepOnce();
  };

  watch(
    () => [params.content(), animationCfg.value] as const,
    () => runTyping("content"),
    { immediate: true },
  );

  watch(
    () => params.streaming(),
    streaming => {
      if (!streaming) runTyping("streaming");
    },
  );

  onBeforeUnmount(stop);

  return {
    renderedData,
    animating,
    animationCfg,
  };
}
