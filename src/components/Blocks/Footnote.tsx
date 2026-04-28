'use client';

import { useState, useId } from 'react';
import { cn } from '~/util/cn';

type FootnoteBlock = {
  label: string;
  content: string;
  id?: string | null;
  blockName?: string | null;
  blockType: 'footnote';
};

type FootnoteProps = {
  block: FootnoteBlock;
  className?: string;
};

/**
 * Inline footnote / aside block.
 *
 * Renders a callout with a toggleable aside panel.
 * The label is the main visible text; the content is revealed
 * on click with a smooth expand animation.
 *
 * Design: editorial note card with a numbered superscript marker,
 * left-border accent, and a subtle paper-fold aesthetic.
 */
const Footnote = ({ block, className }: FootnoteProps) => {
  const { label, content } = block;
  const [open, setOpen] = useState(false);
  const contentId = useId();

  return (
    <aside
      className={cn(
        'my-8 lg:my-12 group',
        className
      )}
    >
      <div
        className={cn(
          'relative border border-secondary/15 rounded-sm overflow-hidden transition-colors duration-300',
          open ? 'border-secondary/30' : 'hover:border-secondary/25'
        )}
      >
        {/* Accent left bar */}
        <div
          className={cn(
            'absolute left-0 top-0 bottom-0 w-0.5 bg-secondary transition-opacity duration-300',
            open ? 'opacity-100' : 'opacity-30'
          )}
        />

        {/* Trigger row */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={contentId}
          className="w-full flex items-start gap-4 pl-5 pr-4 py-4 text-left cursor-pointer group/btn"
        >
          {/* Footnote superscript pill */}
          <span
            aria-hidden="true"
            className={cn(
              'shrink-0 mt-0.5 inline-flex items-center justify-center',
              'w-5 h-5 rounded-full border border-secondary/30 text-[10px] font-suisse font-medium text-secondary/60',
              'transition-all duration-200',
              open ? 'bg-secondary text-primary border-secondary' : 'group-hover/btn:border-secondary/60'
            )}
          >
            ※
          </span>

          <span className="font-suisse text-base text-secondary leading-relaxed flex-1">
            {label}
          </span>

          {/* Chevron */}
          <svg
            className={cn(
              'shrink-0 mt-1 w-3.5 h-3.5 text-grey transition-transform duration-300',
              open ? 'rotate-180' : ''
            )}
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
          >
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Collapsible aside content */}
        <div
          id={contentId}
          className={cn(
            'overflow-hidden transition-all duration-300 ease-in-out',
            open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="pl-14 pr-4 pb-5">
            <div className="h-px w-full bg-secondary/10 mb-4" />
            <p className="font-suisse text-sm text-grey leading-relaxed">
              {content}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Footnote;
