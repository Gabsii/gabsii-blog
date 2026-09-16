import { forwardRef, ComponentProps } from 'react';
import { type MotionProps } from 'motion/react';
import * as m from "motion/react-client";
import { cn } from '~/util/cn'; // Assuming `cn` is a utility for conditional class names

type MotionButtonProps = ComponentProps<'button'> & MotionProps;

type ButtonProps = {
  variant?: 'default' | 'small';
  wrapperClassName?: string;
  isInverted?: boolean;
  children?: React.ReactNode;
  /**
   * Render as something other than a <button> — pass a link component here
   * instead of wrapping this in one. `<a>` around `<button>` is invalid HTML,
   * gives one action two tab stops, and confuses assistive tech about the role.
   */
  /**
   * Render the button's appearance on a non-interactive element. Use
   * `as="span"` inside a <Link> rather than wrapping a real <button> in one:
   * <a> around <button> is invalid HTML, produces two tab stops for a single
   * action, and leaves assistive tech ambiguous about the role.
   */
  as?: 'button' | 'span' | 'div';
} & Omit<MotionButtonProps, 'ref'>;


const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'default',
      isInverted = false,
      className,
      wrapperClassName,
      children,
      as,
      ...props
    },
    ref
  ) => {
    // The three motion tags have mutually incompatible prop types; callers only
    // ever pass button props, so erase the distinction here.
    const Tag = (as === 'span' ? m.span : as === 'div' ? m.div : m.button) as React.ElementType;

    return (
      <div
        className={cn(
          `relative inline-flex w-full min-w-fit max-w-full ${variant === 'small' ? 'h-6 md:h-8 lg:h-10' : 'h-9 md:h-12 lg:h-16'
          }`,
          wrapperClassName
        )}
      >
        <Tag
          ref={ref}
          whileTap={{ translateX: 0, translateY: 0, transition: { duration: 0.1 } }}
          whileHover={{
            translateX: 4,
            translateY: -4,
            transition: { type: 'spring', bounce: 0.5, duration: 0.05 },
          }}
          className={cn(
            `
            font-suisse font-medium uppercase
            min-w-fit w-full h-full z-10 overflow-hidden
            flex justify-center items-center
            ${variant === 'small'
              ? 'px-4 py-2 text-xs'
              : 'py-1 px-4 md:px-6 lg:px-8 text-base'
            }
            ${isInverted
              ? 'bg-primary text-secondary border-secondary'
              : 'bg-secondary border-primary text-primary'
            } border-2
            active:translate-x-1 active:-translate-y-1
            `,
            className
          )}
          {...props} // Spread remaining props
        >
          {children}
        </Tag>
        <span
          className={`absolute top-0 left-0 w-full h-full ${isInverted
              ? 'bg-secondary border-secondary'
              : 'bg-primary border-primary'
            } z-0 border-2`}
        />
      </div>
    );
  }
);

Button.displayName = 'Button';

export default Button;
