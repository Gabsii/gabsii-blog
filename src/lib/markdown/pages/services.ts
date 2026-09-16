import { getTranslations } from 'next-intl/server'

import { joinSections, type MarkdownDocument } from '../document'
import { canonicalPath, type MarkdownLocale } from '../routes'
import { SITE_URL } from '../site'

const DESCRIPTION =
  'Web development, creative direction, and freelance consulting from Gabsii — Austria-based full-stack developer building performant, memorable digital experiences.'

type Translator = Awaited<ReturnType<typeof getTranslations>>

function tags(t: Translator, key: string): string[] {
  const raw = t.raw(key)

  return Array.isArray(raw) ? raw.map(String) : []
}

export async function buildServicesDocument(locale: MarkdownLocale): Promise<MarkdownDocument> {
  const t = await getTranslations({ locale, namespace: 'Services' })

  const services = [1, 2, 3].map((index) => {
    const serviceTags = tags(t, `service${index}Tags`)

    return joinSections(
      `### ${t(`service${index}Title`)}`,
      t(`service${index}Description`),
      serviceTags.length ? `**Stack:** ${serviceTags.join(', ')}` : null,
    )
  })

  const steps = [1, 2, 3, 4].map(
    (index) => `${index}. **${t(`step${index}Title`)}** — ${t(`step${index}Description`)}`,
  )

  return {
    title: t('heroHeadline'),
    description: DESCRIPTION,
    path: canonicalPath(locale, 'services'),
    locale,
    body: joinSections(
      `**${t('heroEyebrow')}**`,
      t('heroSubheadline'),
      `## ${t('servicesLabel')}`,
      ...services,
      `## ${t('processHeadline')}`,
      steps.join('\n'),
      `## ${t('testimonialLabel')}`,
      // The translated author string already carries its own em dash.
      `> ${t('testimonialQuote')}\n>\n> ${t('testimonialAuthor').replace(/^[—–-]\s*/, '— ')}`,
      `## ${t('ctaHeadline')}`,
      t('ctaSubheadline'),
      `[${t('ctaButton')}](${SITE_URL}${canonicalPath(locale, 'contact')})`,
    ),
  }
}
