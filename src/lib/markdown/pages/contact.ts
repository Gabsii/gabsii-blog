import { getTranslations } from 'next-intl/server'

import { joinSections, type MarkdownDocument } from '../document'
import { canonicalPath, type MarkdownLocale } from '../routes'
import { SITE_URL } from '../site'

const DESCRIPTION =
  'Get in touch with Gabsii for web development projects, collaborations, or just to say hello.'

export async function buildContactDocument(locale: MarkdownLocale): Promise<MarkdownDocument> {
  const t = await getTranslations({ locale, namespace: 'Contact' })

  return {
    title: t('interestedInWorking'),
    description: DESCRIPTION,
    path: canonicalPath(locale, 'contact'),
    locale,
    body: joinSections(
      t('cta'),
      '## Get in touch',
      ['- Email: <hello@gabsii.com>', `- Contact form: ${SITE_URL}${canonicalPath(locale, 'contact')}`].join('\n'),
    ),
  }
}
