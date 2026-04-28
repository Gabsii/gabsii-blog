import { cn } from '~/util/cn';

type PullQuoteBlock = {
  quote: string;
  author?: string | null;
  source?: string | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'pull-quote';
};

type PullQuoteProps = {
  block: PullQuoteBlock;
  className?: string;
};

/**
 * Pull quote block — typographically expressive callout using Piazzolla.
 * Squiggly underline motif, large editorial scale, subtle attribution line.
 */
const PullQuote = ({ block, className }: PullQuoteProps) => {
  const { quote, author, source } = block;

  return (
    <figure
      className={cn(
        'my-12 lg:my-20 relative',
        className
      )}
    >
      {/* Decorative large quotation mark */}
      <span
        aria-hidden="true"
        className="absolute -top-6 -left-2 font-piazzolla text-[8rem] leading-none text-secondary/10 select-none pointer-events-none"
      >
        "
      </span>

      <blockquote className="relative pl-8 border-l-2 border-secondary">
        <p
          className={cn(
            'font-piazzolla font-semibold text-2xl lg:text-4xl leading-tight text-secondary',
            'squiggly'
          )}
          style={{ stroke: 'currentColor' }}
        >
          {quote}
        </p>

        {(author || source) && (
          <figcaption className="mt-6 font-suisse text-sm text-grey flex items-center gap-2">
            <span className="inline-block w-6 h-px bg-grey" aria-hidden="true" />
            {author && <span className="font-medium text-secondary">{author}</span>}
            {author && source && <span aria-hidden="true">·</span>}
            {source && <span className="italic">{source}</span>}
          </figcaption>
        )}
      </blockquote>
    </figure>
  );
};

export default PullQuote;
