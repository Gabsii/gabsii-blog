import type { Project } from "~/payload-types";
import { AmbientColorWash } from "~/src/blocks/AmbientColorWash/AmbientColorWash";
import { HardFacts } from "~/src/blocks/HardFacts/HardFacts";
import { PostParagraph } from "~/src/blocks/PostParagraph/PostParagraph";
import { Timeline } from "~/src/blocks/Timeline/Timeline";
import { MoodBoard } from "~/src/blocks/MoodBoard/MoodBoard";
import { Footnote } from "~/src/blocks/Footnote/Footnote";
import { SectionDivider } from "~/src/blocks/SectionDivider/SectionDivider";
import { PullQuote } from "~/src/blocks/PullQuote/PullQuote";
import { PostImage } from "~/src/blocks/PostImage/PostImage";

const defaulted = (promise: Promise<{ default: React.ComponentType<any> }>) => promise.then((module) => module.default);

const registry = {
  [HardFacts.slug]: () => defaulted(import('@/components/Blocks/HardFacts')),
  [PostParagraph.slug]: () => defaulted(import('@/components/Blocks/PostParagraph')),
  [PostImage.slug]: () => defaulted(import('@/components/Blocks/PostImage')),
  [PullQuote.slug]: () => defaulted(import('@/components/Blocks/PullQuote')),
  [SectionDivider.slug]: () => defaulted(import('@/components/Blocks/SectionDivider')),
  [Footnote.slug]: () => defaulted(import('@/components/Blocks/Footnote')),
  [MoodBoard.slug]: () => defaulted(import('@/components/Blocks/MoodBoard')),
  [Timeline.slug]: () => defaulted(import('@/components/Blocks/Timeline')),
  [AmbientColorWash.slug]: () => defaulted(import('@/components/Blocks/AmbientColorWash')),
}

const ProjectContentRegistry = async ({ content, ...props }: Project) => {
  return (
    <>
      {
        content.map(async (block) => {
          const loadComponent = registry[block.blockType];

          if (!loadComponent) {
            return null;
          }

          const Component = (await loadComponent());

          return <Component key={block.id} block={block} {...props} />;
        })
      }
    </>
  );
}

export default ProjectContentRegistry
