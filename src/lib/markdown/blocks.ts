import type { Media, Post, Project } from '~/payload-types'

import { lexicalToMarkdown } from './lexical'
import { absoluteUrl } from './site'

type ContentBlock = Post['content'][number] | Project['content'][number]

/** Payload only populates relationships up to the query depth — ids stay unresolved. */
function resolveMedia(value: number | Media | null | undefined): Media | null {
  return value && typeof value === 'object' ? value : null
}

function mediaMarkdown(value: number | Media | null | undefined, caption?: string | null): string {
  const media = resolveMedia(value)
  const url = absoluteUrl(media?.url)

  if (!url) return ''

  const image = `![${media?.alt?.trim() ?? ''}](${url})`

  // A caption is authored copy, not a description of the image — keep both.
  return caption?.trim() ? `${image}\n\n*${caption.trim()}*` : image
}

function coordinates(latitude: number, longitude: number): string {
  return `${latitude}, ${longitude}`
}

async function blockToMarkdown(block: ContentBlock): Promise<string> {
  switch (block.blockType) {
    case 'paragraph':
      return lexicalToMarkdown(block.text)

    case 'image':
      return mediaMarkdown(block.image)

    case 'pull-quote': {
      const attribution = [block.author, block.source].filter(Boolean).join(', ')
      const quote = `> ${block.quote.replace(/\n/g, '\n> ')}`

      return attribution ? `${quote}\n>\n> — ${attribution}` : quote
    }

    case 'divider':
      return '---'

    case 'footnote':
      return `> **${block.label}** — ${block.content}`

    case 'location':
      return `**Location:** ${block.label} (${coordinates(block.latitude, block.longitude)})`

    case 'map-tour': {
      const stops = (block.stops ?? []).map((stop) => {
        const detail = [stop.description, `${coordinates(stop.latitude, stop.longitude)}`]
          .filter(Boolean)
          .join(' — ')

        return `- **${stop.title}** — ${detail}`
      })

      return stops.length > 0 ? `**Map tour**\n\n${stops.join('\n')}` : ''
    }

    case 'mood-board': {
      const images = (block.images ?? [])
        .map((entry) => mediaMarkdown(entry.image, entry.caption))
        .filter(Boolean)

      return images.join('\n\n')
    }

    case 'timeline': {
      const items = (block.items ?? []).map((item) => {
        const heading = `- **${item.date}** — ${item.title}`

        return item.description ? `${heading}\n  ${item.description}` : heading
      })

      return items.join('\n')
    }

    case 'hard-facts': {
      const facts = (block.facts ?? []).filter((fact) => fact.label || fact.value)

      if (facts.length === 0) return block.title ? `## ${block.title}` : ''

      // Label/value pairs read better as a list than as a headerless table.
      const list = facts
        .map((fact) => (fact.label ? `- **${fact.label}:** ${fact.value ?? ''}` : `- ${fact.value ?? ''}`))
        .join('\n')

      return block.title ? `## ${block.title}\n\n${list}` : list
    }

    // Purely decorative — only its optional rich text carries meaning.
    case 'color-wash':
      return lexicalToMarkdown(block.text)

    default:
      return ''
  }
}

/** Serialises a Payload blocks field into Markdown, dropping empty blocks. */
export async function blocksToMarkdown(blocks: ContentBlock[] | null | undefined): Promise<string> {
  if (!blocks?.length) return ''

  const rendered = await Promise.all(blocks.map(blockToMarkdown))

  return rendered
    .map((block) => block.trim())
    .filter(Boolean)
    .join('\n\n')
}
