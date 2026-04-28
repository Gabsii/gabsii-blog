import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html';
import { cn } from '~/util/cn';

type AmbientColorWashBlock = {
  /** Hex color or CSS named color for the wash */
  color: string;
  /** Optional content rendered on the color wash */
  text?: SerializedEditorState | null;
  /** Text alignment */
  align?: 'left' | 'center' | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'color-wash';
};

type AmbientColorWashProps = {
  block: AmbientColorWashBlock;
  className?: string;
};

/**
 * Ambient color wash block — a full-bleed section that shifts the
 * background to a chosen color, creating atmosphere between content.
 *
 * Transitions softly from the page background via a top/bottom gradient
 * fade so the edge never feels hard. Optionally renders richtext content
 * centered on the wash.
 */
const AmbientColorWash = ({ block, className }: AmbientColorWashProps) => {
  const { color, text, align = 'center' } = block;

  const html = text ? convertLexicalToHTML({ data: text }) : null;

  return (
    <div
      className={cn('relative w-full my-0', className)}
      style={{
        // Smooth fade in from page bg, hold the wash color, fade back out
        background: `
          linear-gradient(
            to bottom,
            var(--app-color-primary) 0%,
            ${color} 15%,
            ${color} 85%,
            var(--app-color-primary) 100%
          )
        `,
      }}
    >
      {/* Content area */}
      <div
        className={cn(
          'max-w-1200 mx-auto py-20 lg:py-32 px-4 lg:px-8',
          align === 'center' ? 'text-center' : 'text-left'
        )}
      >
        {html ? (
          <div
            className="content prose prose-lg max-w-2xl mx-auto"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          /* Empty wash — purely decorative breathing room */
          <div className="h-16" aria-hidden="true" />
        )}
      </div>
    </div>
  );
};

export default AmbientColorWash;
