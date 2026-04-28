'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '~/util/cn';

type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

type TableOfContentsProps = {
  /** CSS selector for the container that holds the post content */
  contentSelector?: string;
  className?: string;
};

/**
 * Sticky Table of Contents — auto-generated from h2/h3 headings in the
 * post content. Highlights the current section as the user scrolls.
 *
 * Designed to sit in the existing left sidebar space on desktop.
 * On mobile it collapses into a toggleable drawer at the top of content.
 */
const TableOfContents = ({
  contentSelector = '[data-post-content]',
  className,
}: TableOfContentsProps) => {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Build the ToC from headings
  useEffect(() => {
    const container = document.querySelector(contentSelector);
    if (!container) return;

    const headings = Array.from(
      container.querySelectorAll<HTMLHeadingElement>('h2, h3')
    );

    const tocItems: TocItem[] = headings.map((el, i) => {
      // Ensure the heading has an id for anchor navigation
      if (!el.id) {
        el.id = `toc-heading-${i}`;
      }
      return {
        id: el.id,
        text: el.textContent?.trim() ?? '',
        level: el.tagName === 'H2' ? 2 : 3,
      };
    });

    setItems(tocItems);
  }, [contentSelector]);

  // Observe headings for active state
  useEffect(() => {
    if (!items.length) return;

    observerRef.current?.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the topmost visible heading
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: '-10% 0px -80% 0px',
        threshold: 0,
      }
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current!.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [items]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileOpen(false);
  };

  if (!items.length) return null;

  return (
    <>
      {/* Desktop sticky sidebar */}
      <nav
        className={cn(
          'hidden lg:block sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto',
          className
        )}
        aria-label="Table of contents"
      >
        <p className="font-suisse text-xs uppercase tracking-widest text-grey mb-4">
          Contents
        </p>
        <ol className="space-y-1">
          {items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => scrollTo(item.id)}
                className={cn(
                  'block w-full text-left font-suisse text-sm leading-snug transition-all duration-200 py-0.5',
                  item.level === 3 ? 'pl-3' : 'pl-0',
                  activeId === item.id
                    ? 'text-secondary font-medium'
                    : 'text-grey hover:text-secondary'
                )}
              >
                {/* Active indicator */}
                <span className="flex items-start gap-2">
                  <span
                    className={cn(
                      'mt-1.5 shrink-0 block w-1 h-1 rounded-full transition-all duration-300',
                      activeId === item.id
                        ? 'bg-secondary scale-125'
                        : 'bg-transparent'
                    )}
                    aria-hidden="true"
                  />
                  <span className="flex-1">{item.text}</span>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </nav>

      {/* Mobile collapsible bar */}
      <div className="lg:hidden mb-6 border border-secondary/15 rounded-sm overflow-hidden">
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="w-full flex items-center justify-between px-4 py-3 font-suisse text-sm text-secondary"
          aria-expanded={mobileOpen}
        >
          <span className="font-medium">Contents</span>
          <svg
            className={cn('w-3.5 h-3.5 transition-transform duration-200 text-grey', mobileOpen ? 'rotate-180' : '')}
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
          >
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div
          className={cn(
            'overflow-hidden transition-all duration-300',
            mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <ol className="px-4 pb-4 space-y-1 border-t border-secondary/10 pt-3">
            {items.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => scrollTo(item.id)}
                  className={cn(
                    'block w-full text-left font-suisse text-sm py-0.5 transition-colors',
                    item.level === 3 ? 'pl-3' : '',
                    activeId === item.id ? 'text-secondary font-medium' : 'text-grey'
                  )}
                >
                  {item.text}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
};

export default TableOfContents;
