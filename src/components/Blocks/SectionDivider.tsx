import { cn } from '~/util/cn';

type SectionDividerBlock = {
  style?: 'squiggly' | 'ornament' | 'line' | 'dots' | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'divider';
};

type SectionDividerProps = {
  block: SectionDividerBlock;
  className?: string;
};

const SquigglyDivider = () => (
  <div className="flex items-center justify-center w-full py-2">
    <svg
      viewBox="0 0 240 12"
      className="w-60 h-3 text-secondary/30"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0 6 Q 5 2 10 6 T 20 6 T 30 6 T 40 6 T 50 6 T 60 6 T 70 6 T 80 6 T 90 6 T 100 6 T 110 6 T 120 6 T 130 6 T 140 6 T 150 6 T 160 6 T 170 6 T 180 6 T 190 6 T 200 6 T 210 6 T 220 6 T 230 6 T 240 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  </div>
);

const OrnamentDivider = () => (
  <div className="flex items-center justify-center gap-4 w-full">
    <span className="flex-1 h-px bg-secondary/20" />
    <span
      className="font-piazzolla text-secondary/40 text-xl select-none"
      aria-hidden="true"
    >
      ◆
    </span>
    <span className="flex-1 h-px bg-secondary/20" />
  </div>
);

const LineDivider = () => (
  <hr className="border-none h-px bg-secondary/20 w-full" />
);

const DotsDivider = () => (
  <div className="flex items-center justify-center gap-3 w-full py-1" aria-hidden="true">
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        className="block w-1 h-1 rounded-full bg-secondary/30"
        style={{ opacity: 1 - i * 0.25 }}
      />
    ))}
    <span className="block w-1.5 h-1.5 rounded-full bg-secondary/50" />
    {[2, 1, 0].map((i) => (
      <span
        key={`r${i}`}
        className="block w-1 h-1 rounded-full bg-secondary/30"
        style={{ opacity: 1 - i * 0.25 }}
      />
    ))}
  </div>
);

/**
 * Section divider block — decorative horizontal separator.
 * Four styles: squiggly, ornament, line, dots.
 */
const SectionDivider = ({ block, className }: SectionDividerProps) => {
  const style = block.style ?? 'ornament';

  return (
    <div
      className={cn('my-10 lg:my-16 w-full', className)}
      role="separator"
      aria-hidden="true"
    >
      {style === 'squiggly' && <SquigglyDivider />}
      {style === 'ornament' && <OrnamentDivider />}
      {style === 'line' && <LineDivider />}
      {style === 'dots' && <DotsDivider />}
    </div>
  );
};

export default SectionDivider;
