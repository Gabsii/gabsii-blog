import { NextResponse } from 'next/server'

import { MARKDOWN_CONTENT_TYPE } from '@/lib/markdown/accept'
import { renderMarkdownDocument } from '@/lib/markdown/document'
import { resolveMarkdownDocument } from '@/lib/markdown/resolve'
import { DEFAULT_LOCALE, LOCALES, type MarkdownLocale } from '@/lib/markdown/routes'
import { SITE_URL } from '@/lib/markdown/site'
import { estimateTokenCount } from '@/lib/markdown/tokens'

/**
 * Serves the markdown representation of a page.
 *
 * Requests normally arrive here as an internal rewrite from `src/middleware.ts`
 * when `Accept: text/markdown` wins content negotiation, so the browser-visible
 * URL stays the HTML one. The path is also directly addressable
 * (`/md/<locale>/<path>`) so agents can link to a stable markdown URL.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug?: string[] }> },
) {
  const { slug = [] } = await params
  const [maybeLocale, ...rest] = slug
  const hasLocale = LOCALES.includes(maybeLocale as MarkdownLocale)
  const locale = hasLocale ? (maybeLocale as MarkdownLocale) : DEFAULT_LOCALE
  const path = (hasLocale ? rest : slug).join('/')

  const document = await resolveMarkdownDocument(locale, path)

  if (!document) {
    return new NextResponse(`# Not found\n\nNo markdown representation exists for \`/${path}\`.\n`, {
      status: 404,
      headers: {
        'Content-Type': MARKDOWN_CONTENT_TYPE,
        Vary: 'Accept',
      },
    })
  }

  const markdown = renderMarkdownDocument(document)

  return new NextResponse(markdown, {
    headers: {
      'Content-Type': MARKDOWN_CONTENT_TYPE,
      'x-markdown-tokens': String(estimateTokenCount(markdown)),
      Link: `<${SITE_URL}${document.path}>; rel="canonical"`,
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
      Vary: 'Accept',
    },
  })
}
