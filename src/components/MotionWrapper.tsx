'use client';

import { MotionConfig } from 'motion/react';
import { ReactNode } from 'react';

interface MotionWrapperProps {
  children: ReactNode;
}

/**
 * Client-side wrapper for MotionConfig.
 * Extracted from server layout to properly handle motion/react client imports.
 */
export function MotionWrapper({ children }: MotionWrapperProps) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  );
}
