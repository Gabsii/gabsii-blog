import React from 'react';
import { HTMLMotionProps, motion } from 'framer-motion';

import { cn } from "~/util/cn";

type ButtonProps = {
  variant?: 'default' | 'small';
  wrapperClassName?: string;
  isInverted?: boolean;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLButtonElement> & HTMLMotionProps<'button'>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'default',
  isInverted = false,
  className,
  wrapperClassName,
  children,
  ...props
}, ref) => {
  return (
    <div className={cn(`relative inline-flex w-full min-w-fit max-w-full ${variant === 'small' ? 'h-6 md:h-8 lg:h-10' : 'h-9 md:h-12 lg:h-16'}`, wrapperClassName)}>
      <motion.button
        ref={ref}
        whileTap={{ translateX: 0, translateY: 0, transition: { duration: 0.1 } }}
        whileHover={{ translateX: 4, translateY: -4, transition: { type: "spring", bounce: 0.5, duration: 0.05 } }}
        // @ts-ignore fml this is a bug in framer motion
        className={cn(`
          font-suisse font-medium uppercase
          min-w-fit w-full h-full z-10 overflow-hidden
          flex justify-center items-center
          ${variant === 'small' ? 'px-4 py-2 text-xs' : 'py-1 px-4 md:px-6 lg:px-8 text-base'}
          ${isInverted ? 'bg-primary text-secondary border-secondary' : 'bg-secondary border-primary text-primary'} border-2
          focus:outline-none focus:outline-2 focus:outline-offset-1 ${isInverted ? 'focus:outline-secondary' : 'focus:outline-primary'}
          focus-within:outline-none focus-within:outline-2 ${isInverted ? 'focus-within:outline-secondary' : 'focus-within:outline-primary'}
          focus-visible:outline-none focus-visible:outline-2 ${isInverted ? 'focus-visible:outline-secondary' : 'focus-visible:outline-primary'}
          active:translate-x-1 active:-translate-y-1
          `, className)}
        {...props}
      >
        {children}
      </motion.button>
      <span
        className={`absolute top-0 left-0 w-full h-full
          ${isInverted ? 'bg-secondary border-secondary' : 'bg-primary border-primary'}
          z-0 border-2`}
      />
    </div>
  );
});

Button.displayName = 'Button';

export default Button;
