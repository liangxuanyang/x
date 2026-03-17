export interface MarkdownRenderOptions {
  trim?: boolean;
}

export function renderMarkdown(
  source: string,
  options: MarkdownRenderOptions = {},
) {
  return options.trim ? source.trim() : source;
}
