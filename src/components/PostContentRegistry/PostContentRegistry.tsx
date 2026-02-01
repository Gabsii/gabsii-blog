import type { Post } from "~/payload-types";
import Section from "@/components/Atoms/Section";
import PostParagraph from "@/components/Blocks/PostParagraph";
import PostImage from "@/components/Blocks/PostImage";
import PostMap from "@/components/Blocks/PostMap";

type BlockType = Post['content'][number]['blockType'];

const registry: Record<BlockType, React.ComponentType<{ block: any; priority?: boolean }>> = {
  'paragraph': PostParagraph,
  'image': PostImage,
  'location': PostMap,
};

const PostContentRegistry = ({ content }: Pick<Post, 'content'>) => {
  return (
    <Section className="lg:pl-0 lg:px-2 px-2">
      {content.map((block, index) => {
        const Component = registry[block.blockType];

        if (!Component) {
          return null;
        }

        // Pass priority to first image block for optimized loading
        const isFirstImage = block.blockType === 'image' &&
          content.findIndex(b => b.blockType === 'image') === index;

        return (
          <Component
            key={block.id}
            block={block}
            priority={isFirstImage}
          />
        );
      })}
    </Section>
  );
};

export default PostContentRegistry;
