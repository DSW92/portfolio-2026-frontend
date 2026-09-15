import BlogPosts from '@/components/BlogPosts/BlogPosts';
import WordPressContent from '@/components/WordPressContent/WordPressContent';

export default function BlockRenderer({ blocks }) {

    if (!blocks) {
        return null;
    }

    return blocks.map((block, index) => {

        switch (block.blockName) {

            case 'bloki-autorskie/blog-posts':

                return (
                    <BlogPosts
                        key={index}
                        postsPerPage={
                            block.attrs?.postsPerPage ?? 6
                        }
                    />
                );

            default:

                return (
                    <WordPressContent
                        key={index}
                        html={block.html}
                    />
                );
        }

    });
}