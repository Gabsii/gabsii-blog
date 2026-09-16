/**
 * Accept-header content negotiation for `text/markdown`.
 *
 * See https://isitagentready.com/.well-known/agent-skills/markdown-negotiation/SKILL.md
 * and https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/
 */

export const MARKDOWN_CONTENT_TYPE = 'text/markdown; charset=utf-8'

/** Media types we treat as "the caller wants markdown". */
const MARKDOWN_TYPES = new Set(['text/markdown', 'text/x-markdown'])

/** Media types we treat as "the caller wants the normal HTML page". */
const HTML_TYPES = new Set(['text/html', 'application/xhtml+xml'])

type MediaRange = {
  /** Lower-cased `type/subtype`, e.g. `text/markdown` or `*​/*`. */
  value: string
  /** Quality factor, 0–1. */
  q: number
}

function parseAccept(header: string): MediaRange[] {
  return header
    .split(',')
    .map((part) => {
      const [rawValue, ...params] = part.split(';')
      const value = rawValue.trim().toLowerCase()

      if (!value) return null

      const qParam = params
        .map((param) => param.trim().toLowerCase())
        .find((param) => param.startsWith('q='))

      const q = qParam ? Number.parseFloat(qParam.slice(2)) : 1

      return { value, q: Number.isFinite(q) ? Math.min(Math.max(q, 0), 1) : 1 }
    })
    .filter((range): range is MediaRange => range !== null)
}

/** Highest q-value across the given concrete media types, ignoring wildcards. */
function qualityFor(ranges: MediaRange[], types: Set<string>): number {
  return ranges.reduce((best, range) => (types.has(range.value) ? Math.max(best, range.q) : best), 0)
}

/** Highest q-value a wildcard range (`*​/*` or `text/*`) grants to `text/html`. */
function wildcardHtmlQuality(ranges: MediaRange[]): number {
  return ranges.reduce(
    (best, range) => (range.value === '*/*' || range.value === 'text/*' ? Math.max(best, range.q) : best),
    0,
  )
}

/**
 * True when the request explicitly asks for a markdown representation.
 *
 * Markdown must be named explicitly — a wildcard (`*​/*`, as sent by curl and
 * most HTTP clients) never counts, so browsers and crawlers keep getting HTML.
 * When both are named, markdown wins on a tie because naming it at all is a
 * deliberate signal from an agent.
 */
export function prefersMarkdown(accept: string | null | undefined): boolean {
  if (!accept) return false

  const ranges = parseAccept(accept)
  const markdownQuality = qualityFor(ranges, MARKDOWN_TYPES)

  if (markdownQuality <= 0) return false

  const htmlQuality = Math.max(qualityFor(ranges, HTML_TYPES), wildcardHtmlQuality(ranges))

  return markdownQuality >= htmlQuality
}
