import type { Post } from "~/payload-types";
import Section from "@/components/Atoms/Section";
import PostParagraph from "@/components/Blocks/PostParagraph";
import PostImage from "@/components/Blocks/PostImage";
import PostMap from "@/components/Blocks/PostMap";
import PullQuote from "@/components/Blocks/PullQuote";
import SectionDivider from "@/components/Blocks/SectionDivider";
import Footnote from "@/components/Blocks/Footnote";
import MoodBoard from "@/components/Blocks/MoodBoard";
import Timeline from "@/components/Blocks/Timeline";
import MapTour from "@/components/Blocks/MapTour";
import AmbientColorWash from "@/components/Blocks/AmbientColorWash";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const registry: Record<string, React.ComponentType<{ block: any; priority?: boolean }>> = {
  'paragraph': PostParagraph,
  'image': PostImage,
  'location': PostMap,
  'pull-quote': PullQuote,
  'divider': SectionDivider,
  'footnote': Footnote,
  'mood-board': MoodBoard,
  'timeline': Timeline,
  'map-tour': MapTour,
  'color-wash': AmbientColorWash,
};

/**
 * Block types that should render full-bleed (outside the padded Section wrapper).
 * These break out of the max-width container intentionally.
 */
const FULL_BLEED_BLOCKS = new Set(['color-wash']);

const PostContentRegistry = ({ content }: Pick<Post, 'content'>) => {
  return (
    <>
      {content.map((block, index) => {
        const Component = registry[block.blockType];

        if (!Component) {
          return null;
        }

        const isFirstImage = block.blockType === 'image' &&
          content.findIndex(b => b.blockType === 'image') === index;

        // Full-bleed blocks (e.g. color-wash) render outside the padded section
        if (FULL_BLEED_BLOCKS.has(block.blockType)) {
          return (
            <Component
              key={block.id}
              block={block}
            />
          );
        }

        return (
          <Section key={block.id} className="lg:pl-0 lg:px-2 px-2">
            <Component
              block={block}
              priority={isFirstImage}
            />
          </Section>
        );
      })}
    </>
  );
};

export default PostContentRegistry;
