const BACKSLASH_RE = /\\/g;
const LEADING_SLASH_RE = /^\/+/;
const EXTENSION_RE = /\.[^.]+$/;
const PATH_SEP_RE = /[/\\.]/g;

export function getDemoId(src: string) {
  if (!src) return "";

  const segments = src.replace(BACKSLASH_RE, "/").split("/").filter(Boolean);
  const reversedSegments = [...segments].reverse();
  const demoIndex = reversedSegments.findIndex(
    (segment: string) => segment.toLowerCase() === "demo",
  );

  if (demoIndex === -1) {
    return src
      .replace(LEADING_SLASH_RE, "")
      .replace(EXTENSION_RE, "")
      .replace(PATH_SEP_RE, "-");
  }

  const componentDemoPath = reversedSegments
    .slice(0, demoIndex + 2)
    .reverse()
    .join("/");
  return componentDemoPath.replace(EXTENSION_RE, "").replace(PATH_SEP_RE, "-");
}
