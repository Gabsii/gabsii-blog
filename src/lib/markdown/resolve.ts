import type { MarkdownDocument } from './document'
import { buildContactDocument } from './pages/contact'
import { buildHomeDocument } from './pages/home'
import { buildImprintDocument } from './pages/imprint'
import { buildNowDocument } from './pages/now'
import { buildPostDocument } from './pages/post'
import { buildPrivacyDocument } from './pages/privacy'
import { buildProjectDocument } from './pages/project'
import { buildServicesDocument } from './pages/services'
import type { MarkdownLocale } from './routes'

const STATIC_BUILDERS: Record<string, (locale: MarkdownLocale) => Promise<MarkdownDocument>> = {
  '': buildHomeDocument,
  now: buildNowDocument,
  services: buildServicesDocument,
  contact: buildContactDocument,
  imprint: buildImprintDocument,
  privacy: buildPrivacyDocument,
}

const COLLECTION_BUILDERS: Record<
  string,
  (locale: MarkdownLocale, slug: string) => Promise<MarkdownDocument | null>
> = {
  posts: buildPostDocument,
  projects: buildProjectDocument,
}

/**
 * Builds the markdown representation of a page, or `null` when the page has
 * none (unknown route, or a slug that does not exist).
 *
 * `path` is locale-stripped and has no leading slash — see `splitLocale`.
 */
export async function resolveMarkdownDocument(
  locale: MarkdownLocale,
  path: string,
): Promise<MarkdownDocument | null> {
  const staticBuilder = STATIC_BUILDERS[path]

  if (staticBuilder) return staticBuilder(locale)

  const [collection, slug, ...rest] = path.split('/')
  const collectionBuilder = COLLECTION_BUILDERS[collection]

  if (!collectionBuilder || !slug || rest.length > 0) return null

  return collectionBuilder(locale, decodeURIComponent(slug))
}
