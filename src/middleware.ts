import createMiddleware from 'next-intl/middleware'
import { NextResponse, type NextRequest } from 'next/server'

import { prefersMarkdown } from './lib/markdown/accept'
import {
  hasMarkdownRepresentation,
  markdownRewritePath,
  splitLocale,
  type MarkdownLocale,
} from './lib/markdown/routes'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

/**
 * Adds `Accept` to whatever `Vary` is already set, so caches never hand an HTML
 * response to an agent asking for markdown (or vice versa).
 *
 * Best-effort only: Next.js replaces `Vary` on app-router page responses with
 * its own RSC list, so this survives on the markdown responses but not on the
 * HTML ones. Correctness does not depend on it — this middleware runs ahead of
 * the CDN cache, and the rewrite gives markdown requests a different cache key
 * from the HTML they would otherwise hit.
 */
function varyOnAccept(response: NextResponse): NextResponse {
  const existing = response.headers.get('Vary')
  const fields = new Set(
    (existing ?? '')
      .split(',')
      .map((field) => field.trim())
      .filter(Boolean),
  )

  if (![...fields].some((field) => field.toLowerCase() === 'accept')) fields.add('Accept')

  response.headers.set('Vary', [...fields].join(', '))

  return response
}

/** Advertises the markdown representation of an HTML page to clients that did not ask for it. */
function advertiseMarkdown(
  response: NextResponse,
  locale: MarkdownLocale,
  path: string,
): NextResponse {
  response.headers.append(
    'Link',
    `<${markdownRewritePath(locale, path)}>; rel="alternate"; type="text/markdown"`,
  )

  return response
}

export default function middleware(request: NextRequest): NextResponse {
  const isReadRequest = request.method === 'GET' || request.method === 'HEAD'
  const { locale, path } = splitLocale(request.nextUrl.pathname)
  const negotiable = isReadRequest && hasMarkdownRepresentation(path)

  // Pages without a markdown representation simply fall through to HTML.
  if (negotiable && prefersMarkdown(request.headers.get('accept'))) {
    const target = request.nextUrl.clone()
    target.pathname = markdownRewritePath(locale, path)

    return varyOnAccept(NextResponse.rewrite(target))
  }

  const response = varyOnAccept(intlMiddleware(request))

  return negotiable ? advertiseMarkdown(response, locale, path) : response
}

// see https://next-intl-docs.vercel.app/docs/routing/middleware
export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next`, `/_vercel`, `/admin`, or `/md`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|admin|ingest|next|md(?:/|$)|.*\\..*).*)',
  ],
}
