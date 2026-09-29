import BlogPosts from '@/components/BlogPosts/BlogPosts';
import WordPressContent from '@/components/WordPressContent/WordPressContent';
import Portfolio from '@/components/Portfolio/Portfolio';

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
                        category={
                            block.attrs?.category ?? 'all'
                        }
                    />
                );

            case 'bloki-autorskie/portfolio':

                return (
                    <Portfolio
                        key={index}
                        postsPerPage={
                            block.attrs?.postsPerPage ?? 6
                        }
                        category={
                            block.attrs?.category ?? 'all'
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