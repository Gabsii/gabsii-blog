import type { Project } from "~/payload-types";

const defaulted = (promise: Promise<{ default: React.ComponentType<any> }>) => promise.then((module) => module.default);

const registry = {
  'hard-facts': () => defaulted(import('@/components/Blocks/HardFacts')),
  'post-paragraph': () => defaulted(import('@/components/Blocks/PostParagraph')),
  'post-image': () => defaulted(import('@/components/Blocks/PostImage')),
  'pull-quote': () => defaulted(import('@/components/Blocks/PullQuote')),
  'section-divider': () => defaulted(import('@/components/Blocks/SectionDivider')),
  'footnote': () => defaulted(import('@/components/Blocks/Footnote')),
  'mood-board': () => defaulted(import('@/components/Blocks/MoodBoard')),
  'timeline': () => defaulted(import('@/components/Blocks/Timeline')),
  'ambient-color-wash': () => defaulted(import('@/components/Blocks/AmbientColorWash')),
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
