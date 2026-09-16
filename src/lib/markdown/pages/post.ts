import config from '@payload-config'
import { getPayload, type TypedLocale } from 'payload'

import type { Media, Post } from '~/payload-types'

import { blocksToMarkdown } from '../blocks'
import { joinSections, type MarkdownDocument } from '../document'
import { canonicalPath, type MarkdownLocale } from '../routes'
import { absoluteUrl } from '../site'

export async function buildPostDocument(
  locale: MarkdownLocale,
  slug: string,
): Promise<MarkdownDocument | null> {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'post',
    locale: locale as TypedLocale,
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const post = docs[0] as Post | undefined

  if (!post) return null

  const titleImage = typeof post.titleImage === 'object' ? (post.titleImage as Media) : null
  const titleImageUrl = absoluteUrl(titleImage?.url)
  const publishedAt = new Date(post.publishedAt).toISOString().slice(0, 10)

  const metadata = [
    `**Published:** ${publishedAt}`,
    post.tags?.length ? `**Tags:** ${post.tags.join(', ')}` : null,
  ]
    .filter(Boolean)
    .join('  \n')

  return {
    title: post.title,
    description: post.subtitle,
    path: canonicalPath(locale, `posts/${slug}`),
    locale,
    updatedAt: post.updatedAt,
    body: joinSections(
      post.subtitle,
      metadata,
      titleImageUrl ? `![${titleImage?.alt ?? post.title}](${titleImageUrl})` : null,
      await blocksToMarkdown(post.content),
    ),
  }
}
