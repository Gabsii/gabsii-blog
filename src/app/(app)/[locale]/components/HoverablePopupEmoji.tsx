"use client";

import { useState, useRef, useEffect } from 'react';

interface HoverablePopoverEmojiProps {
  text: string;
  popoverEmoji: string;
}

const HoverablePopoverEmoji: React.FC<HoverablePopoverEmojiProps> = ({ text, popoverEmoji }) => {
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const popoverRef = useRef<HTMLSpanElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const isTouchDevice = useRef(false);

  useEffect(() => {
    if (!isActive) return;

    let rafId: number;
    const updatePosition = () => {
      if (!containerRef.current || !popoverRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      if (isTouchDevice.current) {
        // For touch devices, center the popover above the text
        popoverRef.current.style.setProperty('--mouse-x', `${rect.width / 2}px`);
        popoverRef.current.style.setProperty('--mouse-y', `${0}px`);
      } else {
        // For mouse devices, follow the cursor
        popoverRef.current.style.setProperty('--mouse-x', `${mousePos.current.x - rect.left}px`);
        popoverRef.current.style.setProperty('--mouse-y', `${mousePos.current.y - rect.top}px`);
      }

      rafId = requestAnimationFrame(updatePosition);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleTouchStart = (_e: TouchEvent) => {
      isTouchDevice.current = true;
      setIsActive(true);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchstart', handleTouchStart);

    rafId = requestAnimationFrame(updatePosition);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchstart', handleTouchStart);
      cancelAnimationFrame(rafId);
    };
  }, [isActive]);

  return (
    <span
      ref={containerRef}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onTouchStart={() => setIsActive(true)}
      onTouchEnd={() => setIsActive(false)}
      className="font-medium relative inline-block touch-manipulation"
      style={{ perspective: '1000px' }}
    >
      {text}
      {isActive && (
        <span
          ref={popoverRef}
          className="pointer-events-none fixed bg-primary border-2 border-secondary
                     rounded-md px-2 py-1 will-change-transform touch-none
                     transition-all duration-200 ease-out origin-bottom"
          style={{
            top: 0,
            left: 0,
            opacity: isActive ? 1 : 0,
            transform: `translate(calc(-50% + var(--mouse-x, 0px)),
                                calc(-100% + var(--mouse-y, 0px) - 20px))
                                translateY(${isActive ? '0' : '10px'})`,
          }}
        >
          {popoverEmoji}
        </span>
      )}
    </span>
  );
};

export default HoverablePopoverEmoji;
