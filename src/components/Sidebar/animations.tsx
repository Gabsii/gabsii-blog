import { motion } from "motion/react";

import Button from '../Atoms/Button';

export const MotionButton = motion.create(Button);

export const overlayVariants = {
  open: {
    opacity: 1,
    x: 0,
    transition: {
      type: "tween" as const,
      ease: "easeOut" as const,
      staggerChildren: 0.1,
    }
  },
  closed: {
    opacity: 0,
    x: "-120%",
    transition: {
      delay: 0.5,
      type: "spring" as const,
      stiffness: 400,
      damping: 40
    }
  },
}

export const nestedVariants = {
  open: {
    transition: {
      delayChildren: 1,
      staggerChildren: 0.1,
    }
  },
  closed: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
    }
  }
}

export const childrenVariants = {
  open: {
    opacity: 1,
  },
  closed: {
    opacity: 0,
  }
}
