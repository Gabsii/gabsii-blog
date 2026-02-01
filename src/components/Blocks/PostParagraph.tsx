import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { convertLexicalToHTML } from "@payloadcms/richtext-lexical/html";
import { cn } from '~/util/cn';

type PostParagraphBlock = {
  text: SerializedEditorState;
  id?: string | null;
  blockName?: string | null;
  blockType: 'paragraph';
};

type PostParagraphProps = {
  block: PostParagraphBlock;
  className?: string;
};

/**
 * Rich text paragraph block for blog posts.
 * Renders Lexical rich text content as HTML with prose styling.
 */
const PostParagraph = ({ block, className }: PostParagraphProps) => {
  if (!block.text) {
    return null;
  }

  return (
    <section 
      className={cn("content prose prose-lg max-w-none", className)}
      dangerouslySetInnerHTML={{ __html: convertLexicalToHTML({ data: block.text }) }}
    />
  );
};

export default PostParagraph;
