import configPromise from '@payload-config'
import { convertLexicalToMarkdown, editorConfigFactory } from '@payloadcms/richtext-lexical'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

/**
 * Building the sanitized editor config resolves every Lexical feature, so it is
 * memoised for the lifetime of the server process.
 */
let editorConfigPromise: ReturnType<typeof editorConfigFactory.default> | null = null

function getEditorConfig() {
  editorConfigPromise ??= (async () => editorConfigFactory.default({ config: await configPromise }))()

  return editorConfigPromise
}

/** Converts a Payload rich-text value into Markdown. */
export async function lexicalToMarkdown(data: unknown): Promise<string> {
  if (!data || typeof data !== 'object' || !('root' in data)) return ''

  const markdown = convertLexicalToMarkdown({
    data: data as SerializedEditorState,
    editorConfig: await getEditorConfig(),
  })

  return markdown.replace(/\n{3,}/g, '\n\n').trim()
}
