import { routing } from '@/i18n/routing'

/**
 * `localePrefix: 'as-needed'` means the default locale (en) is served unprefixed,
 * every other locale lives under `/<locale>`.
 *
 * @param path a locale-less, leading-slash path (`/services`); `''` is the home page.
 */
export const localePath = (locale: string, path: string): string =>
  locale === routing.defaultLocale ? path || '/' : `/${locale}${path}`

/**
 * Self-referencing canonical plus the full hreflang set for a page.
 *
 * Google requires every page in an hreflang cluster to point its canonical at
 * itself — a `/de` page canonicalising to its English counterpart drops the
 * German URL from the index and voids the annotation.
 */
export const localeAlternates = (locale: string, path: string) => ({
  canonical: localePath(locale, path),
  languages: {
    ...Object.fromEntries(routing.locales.map((l) => [l, localePath(l, path)])),
    // shown to users whose language matches neither locale
    'x-default': localePath(routing.defaultLocale, path),
  },
})
