import config from '@payload-config'
import { getTranslations } from 'next-intl/server'
import { getPayload, type TypedLocale } from 'payload'

import { getCachedGlobal } from '@/lib/globals'

import { joinSections, type MarkdownDocument } from '../document'
import { canonicalPath, type MarkdownLocale } from '../routes'
import { SITE_URL } from '../site'

const DESCRIPTION =
  'Portfolio of Lukas Gabsi (Gabsii), an Austria-based freelance full-stack developer building performant, memorable digital experiences.'

async function availabilityLine(locale: MarkdownLocale, prefix: string): Promise<string | null> {
  try {
    const settings = await getCachedGlobal('homepage-settings', 1, locale as TypedLocale)()
    const availability = settings.availability?.trim()

    return availability ? `**${prefix.trim()}** ${availability}` : null
  } catch (error) {
    // The homepage degrades gracefully without this global; markdown does too.
    console.error('[markdown/home] Failed to fetch homepage-settings:', error)

    return null
  }
}

async function projectIndex(locale: MarkdownLocale): Promise<string> {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'projects',
    locale: locale as TypedLocale,
    select: { title: true, subtitle: true, slug: true },
    sort: '-dateFrom',
    limit: 100,
  })

  if (docs.length === 0) return ''

  const items = docs.map((project) => {
    const link = `[${project.title}](${SITE_URL}${canonicalPath(locale, `projects/${project.slug}`)})`

    return project.subtitle ? `- ${link} — ${project.subtitle}` : `- ${link}`
  })

  return `## Projects\n\n${items.join('\n')}`
}

async function postIndex(locale: MarkdownLocale): Promise<string> {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'post',
    locale: locale as TypedLocale,
    select: { title: true, subtitle: true, slug: true, publishedAt: true },
    sort: '-publishedAt',
    limit: 100,
  })

  if (docs.length === 0) return ''

  const items = docs.map((post) => {
    const link = `[${post.title}](${SITE_URL}${canonicalPath(locale, `posts/${post.slug}`)})`
    const published = new Date(post.publishedAt).toISOString().slice(0, 10)

    return post.subtitle ? `- ${published} — ${link} — ${post.subtitle}` : `- ${published} — ${link}`
  })

  return `## Posts\n\n${items.join('\n')}`
}

async function pageIndex(locale: MarkdownLocale): Promise<string> {
  const [general, footer] = await Promise.all([
    getTranslations({ locale, namespace: 'General' }),
    getTranslations({ locale, namespace: 'Footer' }),
  ])

  const pages: [string, string][] = [
    [general('services'), 'services'],
    [general('now'), 'now'],
    [general('contact'), 'contact'],
    [footer('imprint'), 'imprint'],
    [footer('dataPrivacy'), 'privacy'],
  ]

  const items = pages.map(([label, path]) => `- [${label}](${SITE_URL}${canonicalPath(locale, path)})`)

  return `## Pages\n\n${items.join('\n')}`
}

export async function buildHomeDocument(locale: MarkdownLocale): Promise<MarkdownDocument> {
  const t = await getTranslations({ locale, namespace: 'Hero' })

  // The homepage renders this sentence as styled fragments; reassemble it as prose.
  const intro = `Gabsii ${t('isA')}${t('creativeFreelanceDeveloper')}${t('building')}${t('memorable')} ${t('and')} ${t('performant')} ${t('virtualExperiences')}.`

  const [availability, pages, projects, posts] = await Promise.all([
    availabilityLine(locale, t('availability')),
    pageIndex(locale),
    projectIndex(locale),
    postIndex(locale),
  ])

  return {
    title: 'Gabsii — Digital Innovation & Web Solutions',
    description: DESCRIPTION,
    path: canonicalPath(locale, ''),
    locale,
    body: joinSections(intro.replace(/\s+/g, ' ').trim(), availability, pages, projects, posts),
  }
}
