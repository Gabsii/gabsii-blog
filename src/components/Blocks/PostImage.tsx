import Image from 'next/image';
import type { Media } from '~/payload-types';
import { cn } from '~/util/cn';

type PostImageBlock = {
  image: number | Media;
  id?: string | null;
  blockName?: string | null;
  blockType: 'image';
};

type PostImageProps = {
  block: PostImageBlock;
  /** Whether this is the first image in the post (affects priority loading) */
  priority?: boolean;
  className?: string;
};

/**
 * Optimized image block for blog posts.
 * 
 * Responsive sizing:
 * - Mobile (<640px): 100vw - loads ~640px image
 * - Tablet (640-1024px): ~90vw of container - loads ~800px image
 * - Desktop (>1024px): capped at 800px content width - loads ~800px image
 */
const PostImage = ({ block, priority = false, className }: PostImageProps) => {
  const image = block.image as Media;

  if (!image?.url) {
    return null;
  }

  return (
    <figure className={cn("my-8 lg:my-12", className)}>
      <div className="relative w-full aspect-video overflow-hidden">
        <Image
          src={image.url}
          alt={image.alt || ''}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 800px"
          className="object-cover"
        />
      </div>
      {image.alt && (
        <figcaption className="mt-3 text-center font-suisse text-sm text-grey">
          {image.alt}
        </figcaption>
      )}
    </figure>
  );
};

export default PostImage;
