import Image from 'next/image';
import type { Media } from '~/payload-types';
import { cn } from '~/util/cn';

type PostHeroImageProps = {
  /** The titleImage field from the Post */
  image: number | Media;
  /** Alt text fallback if not set on media */
  title: string;
  className?: string;
};

/**
 * Optimized hero/thumbnail image for blog posts.
 * Used for the main title image at the top of posts.
 * 
 * Responsive sizing:
 * - Mobile (<640px): 100vw - full width hero
 * - Tablet (640-1024px): 100vw - full width hero
 * - Desktop (>1024px): capped at 1200px
 * 
 * Always uses priority loading since it's above the fold.
 */
const PostHeroImage = ({ image, title, className }: PostHeroImageProps) => {
  const media = image as Media;

  if (!media?.url) {
    return null;
  }

  return (
    <div className={cn("relative w-full h-[40vh] sm:h-[50vh] lg:h-[60vh] max-h-[600px]", className)}>
      <Image
        src={media.url}
        alt={media.alt || title}
        fill
        priority
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px"
        className="object-cover"
      />
    </div>
  );
};

export default PostHeroImage;
