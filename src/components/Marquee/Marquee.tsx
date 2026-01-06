"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useReducedMotion,
  motion,
  animate,
} from "motion/react";

interface VelocityScrollProps {
  text: string;
  default_velocity?: number;
  className?: string;
}

interface ParallaxProps {
  children: string;
  baseVelocity: number;
  className?: string;
  isAnimating?: boolean; // Add new prop
}

export const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

function ParallaxText({
  children,
  baseVelocity = 100,
  className,
  isAnimating = true, // Default to true
}: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const [repetitions, setRepetitions] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const calculateRepetitions = () => {
      if (containerRef.current && textRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const textWidth = textRef.current.offsetWidth;
        const newRepetitions = Math.ceil(containerWidth / textWidth) + 2;
        setRepetitions(newRepetitions % 2 === 0 ? newRepetitions + 1 : newRepetitions);
      }
    };

    calculateRepetitions();

    window.addEventListener("resize", calculateRepetitions);
    return () => window.removeEventListener("resize", calculateRepetitions);
  }, [children]);

  const xTransform = useTransform(baseX, (v) => `${wrap(-100 / repetitions, 0, v)}%`);

  const directionFactor = React.useRef<number>(1);
  useAnimationFrame((t, delta) => {
    if (!isAnimating) return; // Skip animation if not ready

    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });


  // tbh no clue how to fix the type error on the motion.div
  return (
    <div
      className="w-full overflow-hidden whitespace-nowrap"
      ref={containerRef}
    >
      {/* @ts-ignore fml this is a bug in framer motion */}
      <motion.div className={`inline-block ${className}`} style={{ x: xTransform as any }}>
        {Array.from({ length: repetitions }).map((_, i) => (
          <span key={i} ref={i === 0 ? textRef : null} className={'text-primary bg-secondary'} aria-hidden={true}>
            {children}{" "}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function VelocityScroll({
  text,
  default_velocity = 5,
  className,
}: VelocityScrollProps) {
  const y = useMotionValue(128);
  const shouldReduceMotion = useReducedMotion();
  const [isSlideComplete, setIsSlideComplete] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) {
      y.set(0);
      setIsSlideComplete(true);
      return;
    }

    const controls = animate(y, 0, {
      duration: 0.5,
      ease: [0.32, 0.57, 0, 1],
      onComplete: () => setIsSlideComplete(true),
    });

    return controls.stop;
  }, [y, shouldReduceMotion]);

  if (shouldReduceMotion) {
    return (
      <div className="relative col-span-full h-12 lg:h-32 mt-[20vh] overflow-hidden flex justify-center">
        <div className={`inline-block ${className} text-primary bg-secondary`}>
          {text}
        </div>
      </div>
    );
  }

  return (
    <div className="relative col-span-full h-12 lg:h-32 mt-[20vh] overflow-hidden">
      <div className="max-w-1200 mx-auto grid grid-cols-4 gap-px w-full relative h-0">
        <div className="col-start-2 col-span-2 relative">
          <div className="backdrop-invert absolute w-full h-12 lg:h-32 top-full z-10 left-px"></div>
        </div>
      </div>
      <motion.div style={{ y }}>
        <ParallaxText
          baseVelocity={default_velocity}
          className={className}
          isAnimating={isSlideComplete}
        >
          {text}
        </ParallaxText>
      </motion.div>
    </div>
  );
}
