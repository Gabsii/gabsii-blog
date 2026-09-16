import config from '@payload-config'
import { getPayload, type TypedLocale } from 'payload'

import { ServicesOptions } from '@/collections/Projects'
import type { Media, Project } from '~/payload-types'

import { blocksToMarkdown } from '../blocks'
import { joinSections, type MarkdownDocument } from '../document'
import { canonicalPath, type MarkdownLocale } from '../routes'
import { absoluteUrl } from '../site'

const SERVICE_LABELS = new Map(ServicesOptions.map(({ value, label }) => [value as string, label]))

function formatMonth(value: string | null | undefined): string | null {
  if (!value) return null

  return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(
    new Date(value),
  )
}

export async function buildProjectDocument(
  locale: MarkdownLocale,
  slug: string,
): Promise<MarkdownDocument | null> {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'projects',
    locale: locale as TypedLocale,
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const project = docs[0] as Project | undefined

  if (!project) return null

  const image = typeof project.image === 'object' ? (project.image as Media) : null
  const imageUrl = absoluteUrl(image?.url)
  const from = formatMonth(project.dateFrom)
  const to = formatMonth(project.dateTo)
  const services = project.services?.map((service) => SERVICE_LABELS.get(service) ?? service) ?? []

  const metadata = [
    from ? `**Timeframe:** ${to ? `${from} – ${to}` : `${from} – ongoing`}` : null,
    services.length ? `**Services:** ${services.join(', ')}` : null,
    project.url ? `**Live site:** ${project.url}` : null,
  ]
    .filter(Boolean)
    .join('  \n')

  return {
    title: project.title,
    description: project.subtitle,
    path: canonicalPath(locale, `projects/${slug}`),
    locale,
    updatedAt: project.updatedAt,
    body: joinSections(
      project.subtitle,
      metadata,
      imageUrl ? `![${image?.alt ?? project.title}](${imageUrl})` : null,
      await blocksToMarkdown(project.content),
    ),
  }
}
