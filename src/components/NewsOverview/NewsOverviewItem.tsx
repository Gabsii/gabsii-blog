'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Link } from "@/i18n/navigation";
import type { Media, Post } from "~/payload-types";

type ArticlePreview = Pick<Post, "title" | "subtitle" | "slug" | "titleImage">;

type NewsOverviewItemProps = {
  article: ArticlePreview;
};

/**
 * Individual news item with hover popover showing the title image.
 * Popover only appears on desktop (lg+) and follows the cursor.
 */
const NewsOverviewItem = ({ article }: NewsOverviewItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const image = article.titleImage as Media | undefined;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div 
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <Link 
        href={`posts/${article.slug}`} 
        className="max-w-1200 mx-auto flex items-end justify-between pt-6 pb-5 group"
      >
        <h3 className="h-max text-2xl font-piazzolla font-medium group-hover:underline">
          {article.title}
        </h3>
        <p className="font-light text-ellipsis hidden sm:block">
          {article.subtitle}
        </p>
      </Link>
      <hr className="border border-secondary" />

      {/* Hover popover - desktop only */}
      {image?.url && (
        <div
          className={`
            pointer-events-none absolute z-50
            hidden lg:block
            w-[300px] h-[200px] 
            rounded-lg overflow-hidden shadow-2xl
            border-2 border-secondary
            transition-opacity duration-200
            ${isHovered ? 'opacity-100' : 'opacity-0'}
          `}
          style={{
            left: mousePos.x + 20,
            top: mousePos.y - 100,
            transform: 'translateY(-50%)',
          }}
        >
          <Image
            src={image.url}
            alt={image.alt || article.title}
            fill
            sizes="300px"
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default NewsOverviewItem;
