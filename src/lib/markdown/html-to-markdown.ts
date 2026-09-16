/**
 * Minimal HTML → Markdown converter.
 *
 * Only exists for the two places where this site stores authored HTML as a
 * translation string (the imprint fields and the privacy policy blob). Payload
 * rich text never goes through here — that is converted from Lexical directly,
 * which is lossless. A full converter such as Turndown would be overkill for
 * the handful of tags those strings actually use.
 */

const VOID_ELEMENTS = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr'])

/** Block-level wrappers that contribute nothing themselves — render their children as blocks. */
const TRANSPARENT_ELEMENTS = new Set(['div', 'section', 'article', 'header', 'footer', 'main', 'figure', 'figcaption', 'thead', 'tbody', 'tfoot'])

/** Elements that flow inside a paragraph rather than starting a new block. */
const INLINE_ELEMENTS = new Set(['a', 'abbr', 'b', 'br', 'cite', 'code', 'em', 'font', 'i', 'img', 'label', 'mark', 's', 'small', 'span', 'strong', 'sub', 'sup', 'time', 'u'])

const NAMED_ENTITIES: Record<string, string> = {
  amp: '&',
  apos: "'",
  gt: '>',
  lt: '<',
  nbsp: ' ',
  quot: '"',
}

type TextNode = { kind: 'text'; value: string }
type ElementNode = { kind: 'element'; tag: string; attrs: Record<string, string>; children: Node[] }
type Node = TextNode | ElementNode

export function decodeEntities(input: string): string {
  return input.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (match, entity: string) => {
    if (entity.startsWith('#')) {
      const codePoint = entity[1]?.toLowerCase() === 'x'
        ? Number.parseInt(entity.slice(2), 16)
        : Number.parseInt(entity.slice(1), 10)

      return Number.isFinite(codePoint) ? String.fromCodePoint(codePoint) : match
    }

    return NAMED_ENTITIES[entity.toLowerCase()] ?? match
  })
}

function parseAttributes(source: string): Record<string, string> {
  const attrs: Record<string, string> = {}

  for (const match of source.matchAll(/([a-z0-9_:-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/gi)) {
    attrs[match[1].toLowerCase()] = decodeEntities(match[2] ?? match[3] ?? match[4] ?? '')
  }

  return attrs
}

function parse(html: string): Node[] {
  const root: ElementNode = { kind: 'element', tag: '#root', attrs: {}, children: [] }
  const stack: ElementNode[] = [root]
  const tokenPattern = /<!--[\s\S]*?-->|<(\/)?([a-z][a-z0-9]*)((?:[^>"']|"[^"]*"|'[^']*')*?)(\/)?>/gi

  let cursor = 0
  let match: RegExpExecArray | null

  const pushText = (value: string) => {
    if (!value) return
    stack[stack.length - 1].children.push({ kind: 'text', value: decodeEntities(value) })
  }

  while ((match = tokenPattern.exec(html)) !== null) {
    pushText(html.slice(cursor, match.index))
    cursor = match.index + match[0].length

    // Comment.
    if (match[2] === undefined) continue

    const tag = match[2].toLowerCase()

    if (match[1]) {
      // Closing tag: unwind to the nearest matching open element, tolerating
      // unclosed children rather than throwing away the rest of the document.
      const openIndex = stack.findLastIndex((node) => node.tag === tag)
      if (openIndex > 0) stack.length = openIndex
      continue
    }

    const element: ElementNode = { kind: 'element', tag, attrs: parseAttributes(match[3] ?? ''), children: [] }
    stack[stack.length - 1].children.push(element)

    if (!match[4] && !VOID_ELEMENTS.has(tag)) stack.push(element)
  }

  pushText(html.slice(cursor))

  return root.children
}

/** Escapes the markdown control characters that could change the parse of authored prose. */
function escapeInline(text: string): string {
  return text.replace(/([\\`*_[\]])/g, '\\$1')
}

function collapse(text: string): string {
  return text.replace(/\s+/g, ' ')
}

function renderInline(nodes: Node[]): string {
  return nodes.map(renderInlineNode).join('')
}

function renderInlineNode(node: Node): string {
  if (node.kind === 'text') return escapeInline(collapse(node.value))

  switch (node.tag) {
    case 'br':
      // Markdown hard line break — authored HTML uses <br> for address blocks.
      return '  \n'
    case 'b':
    case 'strong': {
      const inner = renderInline(node.children).trim()
      return inner ? `**${inner}**` : ''
    }
    case 'i':
    case 'em': {
      const inner = renderInline(node.children).trim()
      return inner ? `_${inner}_` : ''
    }
    case 'code': {
      const inner = collapse(textContent(node)).trim()
      return inner ? `\`${inner}\`` : ''
    }
    case 'a': {
      const label = renderInline(node.children).trim()
      const href = node.attrs.href?.trim()
      if (!label) return ''
      return href ? `[${label}](${href})` : label
    }
    case 'img': {
      const alt = escapeInline(node.attrs.alt ?? '')
      const src = node.attrs.src?.trim()
      return src ? `![${alt}](${src})` : ''
    }
    default:
      return renderInline(node.children)
  }
}

function textContent(node: Node): string {
  if (node.kind === 'text') return node.value
  return node.children.map(textContent).join('')
}

function indent(block: string, prefix: string, firstPrefix = prefix): string {
  return block
    .split('\n')
    .map((line, index) => {
      const linePrefix = index === 0 ? firstPrefix : prefix
      return line ? `${linePrefix}${line}` : linePrefix.trimEnd()
    })
    .join('\n')
}

function renderList(node: ElementNode): string {
  const ordered = node.tag === 'ol'
  const start = Number.parseInt(node.attrs.start ?? '1', 10)
  const items = node.children.filter((child): child is ElementNode => child.kind === 'element' && child.tag === 'li')

  return items
    .map((item, index) => {
      const marker = ordered ? `${(Number.isFinite(start) ? start : 1) + index}. ` : '- '
      const content = renderBlocks(item.children).trim()
      return indent(content, ' '.repeat(marker.length), marker)
    })
    .join('\n')
}

function renderTable(node: ElementNode): string {
  const rows: ElementNode[] = []

  const collectRows = (current: Node) => {
    if (current.kind !== 'element') return
    if (current.tag === 'tr') {
      rows.push(current)
      return
    }
    current.children.forEach(collectRows)
  }

  node.children.forEach(collectRows)

  if (rows.length === 0) return ''

  const toCells = (row: ElementNode) =>
    row.children
      .filter((cell): cell is ElementNode => cell.kind === 'element' && (cell.tag === 'td' || cell.tag === 'th'))
      .map((cell) => renderInline(cell.children).replace(/\n/g, ' ').replace(/\|/g, '\\|').trim())

  const cells = rows.flatMap((row) =>
    row.children.filter((cell): cell is ElementNode => cell.kind === 'element' && (cell.tag === 'td' || cell.tag === 'th')),
  )

  // A single-cell table is a layout callout, not tabular data.
  if (cells.length === 1) return renderBlocks(cells[0].children)

  const headerIsExplicit = rows[0].children.some((cell) => cell.kind === 'element' && cell.tag === 'th')
  const header = toCells(rows[0])
  const body = rows.slice(1).map(toCells)
  const columnCount = Math.max(header.length, ...body.map((cells) => cells.length), 1)
  const pad = (cells: string[]) => Array.from({ length: columnCount }, (_, index) => cells[index] ?? '')

  const lines = [
    `| ${pad(headerIsExplicit ? header : []).join(' | ')} |`,
    `| ${Array.from({ length: columnCount }, () => '---').join(' | ')} |`,
    ...(headerIsExplicit ? body : [header, ...body]).map((cells) => `| ${pad(cells).join(' | ')} |`),
  ]

  return lines.join('\n')
}

function renderBlockNode(node: Node): string {
  if (node.kind === 'text') return escapeInline(collapse(node.value)).trim()

  switch (node.tag) {
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6': {
      const inner = renderInline(node.children).replace(/\n/g, ' ').trim()
      return inner ? `${'#'.repeat(Number(node.tag[1]))} ${inner}` : ''
    }
    case 'p':
      return renderInline(node.children).trim()
    case 'hr':
      return '---'
    case 'br':
      return ''
    case 'ul':
    case 'ol':
      return renderList(node)
    case 'blockquote':
      return indent(renderBlocks(node.children).trim(), '> ')
    case 'pre':
      return `\`\`\`\n${textContent(node).replace(/\n+$/, '')}\n\`\`\``
    case 'table':
      return renderTable(node)
    case 'img':
      return renderInlineNode(node)
    default:
      if (TRANSPARENT_ELEMENTS.has(node.tag)) return renderBlocks(node.children)
      return renderInline(node.children).trim()
  }
}

function isInline(node: Node): boolean {
  return node.kind === 'text' || INLINE_ELEMENTS.has(node.tag)
}

/**
 * Renders a node list as blocks, keeping consecutive inline nodes together in
 * one paragraph instead of splitting `text <em>text</em>` across two blocks.
 */
function renderBlocks(nodes: Node[]): string {
  const blocks: string[] = []
  let inlineRun: Node[] = []

  const flushInlineRun = () => {
    if (inlineRun.length === 0) return
    blocks.push(renderInline(inlineRun).trim())
    inlineRun = []
  }

  for (const node of nodes) {
    if (isInline(node)) {
      inlineRun.push(node)
      continue
    }

    flushInlineRun()
    blocks.push(renderBlockNode(node))
  }

  flushInlineRun()

  return blocks.filter((block) => block.trim() !== '').join('\n\n')
}

/** Converts an authored HTML fragment into Markdown. */
export function htmlToMarkdown(html: string | null | undefined): string {
  if (!html) return ''

  const withoutNonContent = html.replace(/<(script|style)[\s\S]*?<\/\1>/gi, '')

  return renderBlocks(parse(withoutNonContent)).replace(/\n{3,}/g, '\n\n').trim()
}

/** Strips HTML down to plain text — used for headings and single-line values. */
export function htmlToPlainText(html: string | null | undefined): string {
  if (!html) return ''

  return decodeEntities(html.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim()
}
