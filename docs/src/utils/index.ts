export function clsx(...args: any[]) {
  return args.flat().filter(Boolean).join(" ");
}

export function raf(callback: FrameRequestCallback) {
  return requestAnimationFrame(callback);
}

export function cancelRaf(id: number) {
  cancelAnimationFrame(id);
}
