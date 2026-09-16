import { cn } from '~/util/cn';

type SectionProps = {
  as?: React.ElementType;
  className?: string;
  children?: React.ReactNode;
  // `as` may be a form, so element-specific attributes (noValidate, onSubmit…)
  // have to be accepted rather than narrowed to HTMLAttributes.
} & React.HTMLAttributes<HTMLElement> & Record<string, unknown>;

export default function Section({ as = 'section', children, className, ...props }: SectionProps) {
  const Tag = as;

  return (
    <Tag className={cn('py-8 px-4 lg:px-0 lg:py-24 lg:pl-12.5 max-w-1200 mx-auto', className)} {...props}>
      {children}
    </Tag>
  );
}
