import BlogPosts from '@/components/BlogPosts/BlogPosts';
import WordPressContent from '@/components/WordPressContent/WordPressContent';
import Portfolio from '@/components/Portfolio/Portfolio';

const homeNavigation = {
    pl: [
        { scroll: true, scrollTo: 'O mnie' },
        { scroll: true, scrollTo: 'Wyróżnione projekty', href: '/o-mnie', label: 'Więcej o mnie' },
        { scroll: true, scrollTo: 'Kontakt', href: '/projekty', label: 'Wszystkie projekty' },
        { scroll: false, href: '/kontakt', label: 'Kontakt' },
    ],
    en: [
        { scroll: true, scrollTo: 'About me' },
        { scroll: true, scrollTo: 'Featured work', href: '/en/about', label: 'More about me' },
        { scroll: true, scrollTo: 'Contact', href: '/en/projects', label: 'View projects' },
        { scroll: false, href: '/en/contact', label: 'Contact' },
    ],
};

export default function BlockRenderer({ blocks, isHome = false, locale = 'pl' }) {

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
                        postsPerPage={block.attrs?.postsPerPage ?? 6}
                        category={block.attrs?.category ?? 'all'}
                        navigation={isHome ? homeNavigation[locale]?.[index] : null}
                    />
                );
            
            default:

                return (
                    <WordPressContent
                        key={index}
                        html={block.html}
                        navigation={isHome ? homeNavigation[locale]?.[index] : null}
                    />
                );
        }

    });
}