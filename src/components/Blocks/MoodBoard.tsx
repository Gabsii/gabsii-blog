import Image from 'next/image';
import type { Media } from '~/payload-types';
import { cn } from '~/util/cn';

type MoodBoardImage = {
  image: number | Media;
  caption?: string | null;
  id?: string | null;
};

type MoodBoardBlock = {
  images: MoodBoardImage[];
  id?: string | null;
  blockName?: string | null;
  blockType: 'mood-board';
};

type MoodBoardProps = {
  block: MoodBoardBlock;
  className?: string;
};

/**
 * Mood board grid — asymmetric editorial photo collage.
 *
 * Images are arranged in a CSS grid with varied sizes and subtle
 * rotations, creating a pinboard / scrapbook aesthetic. Supports
 * 1–8 images with an adaptive layout strategy.
 */
const MoodBoard = ({ block, className }: MoodBoardProps) => {
  const { images } = block;
  if (!images?.length) return null;

  const mediaImages = images
    .map((item) => ({ media: item.image as Media, caption: item.caption }))
    .filter((item) => item.media?.url);

  if (!mediaImages.length) return null;

  return (
    <figure className={cn('my-12 lg:my-20', className)}>
      <MoodBoardGrid items={mediaImages} />
    </figure>
  );
};

type GridItem = { media: Media; caption?: string | null };

const ROTATIONS = ['-rotate-1', 'rotate-1', '-rotate-[0.5deg]', 'rotate-[0.5deg]', 'rotate-0', '-rotate-[1.5deg]', 'rotate-[1.5deg]', 'rotate-0'];
const SPANS: Record<number, string[]> = {
  1: ['col-span-2 row-span-2'],
  2: ['col-span-1 row-span-2', 'col-span-1 row-span-2'],
  3: ['col-span-2 row-span-1', 'col-span-1 row-span-2', 'col-span-1 row-span-1'],
  4: ['col-span-1 row-span-2', 'col-span-1 row-span-1', 'col-span-1 row-span-1', 'col-span-1 row-span-2'],
  5: ['col-span-2 row-span-1', 'col-span-1 row-span-1', 'col-span-1 row-span-2', 'col-span-1 row-span-1', 'col-span-1 row-span-1'],
  6: ['col-span-1 row-span-2', 'col-span-1 row-span-1', 'col-span-1 row-span-1', 'col-span-1 row-span-1', 'col-span-1 row-span-2', 'col-span-1 row-span-1'],
  7: ['col-span-2 row-span-1', 'col-span-1 row-span-1', 'col-span-1 row-span-2', 'col-span-1 row-span-1', 'col-span-1 row-span-1', 'col-span-1 row-span-1', 'col-span-1 row-span-1'],
  8: ['col-span-1 row-span-2', 'col-span-1 row-span-1', 'col-span-1 row-span-1', 'col-span-1 row-span-2', 'col-span-1 row-span-1', 'col-span-1 row-span-1', 'col-span-1 row-span-1', 'col-span-1 row-span-1'],
};

const MoodBoardGrid = ({ items }: { items: GridItem[] }) => {
  const count = Math.min(items.length, 8);
  const spans = SPANS[count] ?? SPANS[4];

  return (
    <div
      className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-3 auto-rows-[180px] lg:auto-rows-[220px]"
      aria-label="Photo mood board"
    >
      {items.slice(0, count).map((item, i) => (
        <div
          key={item.media.id ?? i}
          className={cn(
            'relative overflow-hidden',
            spans[i] ?? 'col-span-1 row-span-1',
            ROTATIONS[i % ROTATIONS.length],
            'transition-transform duration-500 hover:rotate-0 hover:scale-[1.02]',
            'shadow-sm hover:shadow-md'
          )}
        >
          <Image
            src={item.media.url!}
            alt={item.media.alt || item.caption || ''}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
            className="object-cover"
          />
          {item.caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent px-3 py-2">
              <p className="font-suisse text-xs text-white/90">{item.caption}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MoodBoard;
