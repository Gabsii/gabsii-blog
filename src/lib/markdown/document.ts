import type { MarkdownLocale } from './routes'
import { SITE_URL } from './site'

export type MarkdownDocument = {
  title: string
  description?: string | null
  /** Locale-aware site path this document represents, e.g. `/de/posts/slug`. */
  path: string
  locale: MarkdownLocale
  /** ISO timestamp of the last content change, when known. */
  updatedAt?: string | null
  /** Markdown body, without the leading `# title`. */
  body: string
}

function escapeYaml(value: string): string {
  return `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`
}

/**
 * Renders a document as Markdown with a small YAML front matter block so agents
 * get the canonical URL and locale without having to infer them.
 */
export function renderMarkdownDocument(document: MarkdownDocument): string {
  const frontMatter = [
    `title: ${escapeYaml(document.title)}`,
    document.description ? `description: ${escapeYaml(document.description)}` : null,
    `url: ${escapeYaml(`${SITE_URL}${document.path}`)}`,
    `locale: ${escapeYaml(document.locale)}`,
    document.updatedAt ? `updated: ${escapeYaml(document.updatedAt)}` : null,
  ].filter(Boolean)

  const body = document.body.replace(/\n{3,}/g, '\n\n').trim()

  return `---\n${frontMatter.join('\n')}\n---\n\n# ${document.title}\n${body ? `\n${body}\n` : ''}`
}

/** Joins pre-rendered sections, dropping the empty ones. */
export function joinSections(...sections: (string | null | undefined)[]): string {
  return sections
    .map((section) => section?.trim())
    .filter((section): section is string => Boolean(section))
    .join('\n\n')
}
