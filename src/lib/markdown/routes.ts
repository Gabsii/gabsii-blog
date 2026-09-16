/**
 * Route table shared by the middleware and the markdown route handler.
 *
 * Kept free of Payload/Next server imports so it stays cheap to pull into
 * middleware.
 */

export const LOCALES = ['en', 'de'] as const

export type MarkdownLocale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: MarkdownLocale = 'en'

/** Internal prefix the middleware rewrites markdown requests to. */
export const MARKDOWN_ROUTE_PREFIX = '/md'

/** Locale-independent paths that have a hand-written markdown representation. */
const STATIC_PAGES = new Set(['', 'now', 'services', 'contact', 'imprint', 'privacy'])

/** Collections served as `/<collection>/<slug>`. */
const COLLECTION_PAGES = new Set(['posts', 'projects'])

function isLocale(value: string | undefined): value is MarkdownLocale {
  return LOCALES.includes(value as MarkdownLocale)
}

/**
 * Splits a request pathname into its locale and the locale-independent page
 * path. `localePrefix: 'as-needed'` means the default locale has no prefix.
 */
export function splitLocale(pathname: string): { locale: MarkdownLocale; path: string } {
  const segments = pathname.split('/').filter(Boolean)

  if (isLocale(segments[0])) {
    return { locale: segments[0], path: segments.slice(1).join('/') }
  }

  return { locale: DEFAULT_LOCALE, path: segments.join('/') }
}

/** True when `path` (locale-stripped, no leading slash) can be served as markdown. */
export function hasMarkdownRepresentation(path: string): boolean {
  if (STATIC_PAGES.has(path)) return true

  const segments = path.split('/')

  return segments.length === 2 && COLLECTION_PAGES.has(segments[0]) && segments[1] !== ''
}

/** Internal path the middleware rewrites to. */
export function markdownRewritePath(locale: MarkdownLocale, path: string): string {
  return path ? `${MARKDOWN_ROUTE_PREFIX}/${locale}/${path}` : `${MARKDOWN_ROUTE_PREFIX}/${locale}`
}

/** Public URL path a markdown document represents, mirroring `localePrefix: 'as-needed'`. */
export function canonicalPath(locale: MarkdownLocale, path: string): string {
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`

  return `${prefix}/${path}` === '/' ? '/' : `${prefix}/${path}`.replace(/\/$/, '')
}
