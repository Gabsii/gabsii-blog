import { getTranslations } from 'next-intl/server'

import { joinSections, type MarkdownDocument } from '../document'
import { htmlToMarkdown, htmlToPlainText } from '../html-to-markdown'
import { canonicalPath, type MarkdownLocale } from '../routes'

const DESCRIPTION =
  'Legal information and imprint for Gabsii — contact details, company information, and legal notices.'

/** Field order mirrors the imprint page; `heading` fields render as `##`. */
const FIELDS: { key: string; heading?: boolean }[] = [
  { key: 'intro' },
  { key: 'companyName' },
  { key: 'address' },
  { key: 'contact' },
  { key: 'companyDetails' },
  { key: 'supervisory' },
  { key: 'professional' },
  { key: 'management' },
  { key: 'dataprotection' },
  { key: 'euDisputeTitle', heading: true },
  { key: 'euDisputeContent' },
  { key: 'euDisputeNotice' },
  { key: 'additionalOnlineTitle', heading: true },
  { key: 'additionalOnlineContent' },
  { key: 'copyright' },
  { key: 'source' },
]

export async function buildImprintDocument(locale: MarkdownLocale): Promise<MarkdownDocument> {
  const t = await getTranslations({ locale, namespace: 'Imprint' })

  const sections = FIELDS.map(({ key, heading }) => {
    const value = t.raw(key)

    if (typeof value !== 'string' || !value.trim()) return null

    // Each field is an HTML fragment; wrapping keeps <br>-separated lines in one paragraph.
    return heading ? `## ${htmlToPlainText(value)}` : htmlToMarkdown(`<p>${value}</p>`)
  })

  return {
    title: htmlToPlainText(t.raw('title')) || 'Imprint',
    description: DESCRIPTION,
    path: canonicalPath(locale, 'imprint'),
    locale,
    body: joinSections(...sections),
  }
}
