import Image from 'next/image';
import type { Media } from '~/payload-types';
import { cn } from '~/util/cn';

type TimelineItem = {
  date: string;
  title: string;
  description?: string | null;
  image?: number | Media | null;
  id?: string | null;
};

type TimelineBlock = {
  items: TimelineItem[];
  id?: string | null;
  blockName?: string | null;
  blockType: 'timeline';
};

type TimelineProps = {
  block: TimelineBlock;
  className?: string;
};

/**
 * Timeline block — vertical chronological narrative.
 *
 * Alternating left/right layout on desktop, single-column on mobile.
 * Each entry has a date pill, title, description, and optional image.
 * The central spine line grows visually as entries are read.
 */
const Timeline = ({ block, className }: TimelineProps) => {
  const { items } = block;
  if (!items?.length) return null;

  return (
    <section className={cn('my-12 lg:my-20', className)} aria-label="Timeline">
      <div className="relative">
        {/* Spine line */}
        <div
          className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-secondary/15 -translate-x-1/2"
          aria-hidden="true"
        />
        {/* Mobile spine */}
        <div
          className="lg:hidden absolute left-5 top-0 bottom-0 w-px bg-secondary/15"
          aria-hidden="true"
        />

        <ol className="relative space-y-10 lg:space-y-0">
          {items.map((item, i) => {
            const isEven = i % 2 === 0;
            const image = item.image as Media | null | undefined;

            return (
              <li
                key={item.id ?? i}
                className={cn(
                  'relative lg:grid lg:grid-cols-2 lg:gap-12',
                  'pl-14 lg:pl-0'
                )}
              >
                {/* Node dot */}
                <div
                  className={cn(
                    'absolute z-10',
                    // Mobile: on the left spine
                    'left-[14px] top-1 lg:left-auto',
                    // Desktop: centered on spine
                    'lg:top-1/2 lg:-translate-y-1/2 lg:left-1/2 lg:-translate-x-1/2'
                  )}
                  aria-hidden="true"
                >
                  <span className="flex items-center justify-center w-3 h-3 rounded-full bg-secondary ring-4 ring-primary" />
                </div>

                {/* Left cell (desktop) — even items: content; odd items: image/spacer */}
                <div
                  className={cn(
                    'hidden lg:flex lg:flex-col',
                    isEven ? 'lg:items-end lg:pr-8 lg:text-right' : 'lg:items-start lg:pl-8'
                  )}
                >
                  {isEven ? (
                    <TimelineContent item={item} align="right" />
                  ) : (
                    image?.url ? (
                      <TimelineImage image={image} />
                    ) : null
                  )}
                </div>

                {/* Right cell (desktop) — even items: image/spacer; odd items: content */}
                <div
                  className={cn(
                    'hidden lg:flex lg:flex-col',
                    isEven ? 'lg:items-start lg:pl-8' : 'lg:items-end lg:pr-8 lg:text-right'
                  )}
                >
                  {isEven ? (
                    image?.url ? (
                      <TimelineImage image={image} />
                    ) : null
                  ) : (
                    <TimelineContent item={item} align="right" />
                  )}
                </div>

                {/* Mobile layout — always single column */}
                <div className="lg:hidden">
                  <TimelineContent item={item} align="left" />
                  {image?.url && (
                    <div className="mt-3">
                      <TimelineImage image={image} />
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

const TimelineContent = ({
  item,
  align,
}: {
  item: TimelineItem;
  align: 'left' | 'right';
}) => (
  <div className={cn('max-w-xs', align === 'right' ? 'text-right' : 'text-left')}>
    <time className="inline-block font-suisse text-xs tracking-widest uppercase text-grey mb-2">
      {item.date}
    </time>
    <h3 className="font-piazzolla font-semibold text-xl text-secondary leading-tight">
      {item.title}
    </h3>
    {item.description && (
      <p className="mt-2 font-suisse text-sm text-grey leading-relaxed">
        {item.description}
      </p>
    )}
  </div>
);

const TimelineImage = ({ image }: { image: Media }) => (
  <div className="relative w-full max-w-xs aspect-video overflow-hidden">
    <Image
      src={image.url!}
      alt={image.alt || ''}
      fill
      sizes="(max-width: 640px) 80vw, 300px"
      className="object-cover"
    />
  </div>
);

export default Timeline;
