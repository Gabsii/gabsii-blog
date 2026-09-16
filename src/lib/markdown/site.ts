/** Canonical origin used to absolutise links and media in markdown output. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://gabsii.com').replace(/\/$/, '')

/** Turns a site-relative path or URL into an absolute one. */
export function absoluteUrl(pathOrUrl: string | null | undefined): string | null {
  if (!pathOrUrl) return null
  if (/^[a-z][a-z0-9+.-]*:/i.test(pathOrUrl) || pathOrUrl.startsWith('//')) return pathOrUrl

  return `${SITE_URL}${pathOrUrl.startsWith('/') ? '' : '/'}${pathOrUrl}`
}
