import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import type { TypedLocale } from 'payload'

import { getCachedGlobal } from '@/lib/globals'

import { joinSections, type MarkdownDocument } from '../document'
import { lexicalToMarkdown } from '../lexical'
import { canonicalPath, type MarkdownLocale } from '../routes'

const DESCRIPTION = "What Gabsii is currently working on, learning and exploring."

export async function buildNowDocument(locale: MarkdownLocale): Promise<MarkdownDocument> {
  const { content, updatedAt } = (await getCachedGlobal('now', 1, locale as TypedLocale)()) as {
    updatedAt: string
    content: SerializedEditorState | null
  }

  return {
    title: 'Now',
    description: DESCRIPTION,
    path: canonicalPath(locale, 'now'),
    locale,
    updatedAt,
    body: joinSections(
      updatedAt ? `**Updated:** ${new Date(updatedAt).toISOString().slice(0, 10)}` : null,
      await lexicalToMarkdown(content),
      'This is a [now page](https://nownownow.com/about) where I share what I am currently working on, learning, or exploring.',
    ),
  }
}
