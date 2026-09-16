import { getTranslations } from 'next-intl/server'

import type { MarkdownDocument } from '../document'
import { htmlToMarkdown } from '../html-to-markdown'
import { canonicalPath, type MarkdownLocale } from '../routes'

const DESCRIPTION =
  'Privacy policy for Gabsii — how your data is collected, used, and protected.'

export async function buildPrivacyDocument(locale: MarkdownLocale): Promise<MarkdownDocument> {
  const t = await getTranslations({ locale, namespace: 'Privacy' })
  const raw = t.raw('html')
  const markdown = htmlToMarkdown(typeof raw === 'string' ? raw : '')

  // The stored HTML opens with its own <h1>; the document renderer adds one too.
  const [firstLine, ...rest] = markdown.split('\n')
  const title = firstLine?.startsWith('# ') ? firstLine.slice(2).trim() : 'Privacy Policy'
  const body = firstLine?.startsWith('# ') ? rest.join('\n').trim() : markdown

  return {
    title,
    description: DESCRIPTION,
    path: canonicalPath(locale, 'privacy'),
    locale,
    body,
  }
}
