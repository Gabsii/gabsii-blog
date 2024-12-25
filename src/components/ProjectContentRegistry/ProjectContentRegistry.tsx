import type { Project } from "~/payload-types";

const defaulted = (promise: Promise<{ default: React.ComponentType<any> }>) => promise.then((module) => module.default);

const registry = {
  'hard-facts': () => defaulted(import('@/components/Blocks/HardFacts')),
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
