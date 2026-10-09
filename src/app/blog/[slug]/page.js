import { notFound } from 'next/navigation';
import WordPressContent from '@/components/WordPressContent/WordPressContent';

async function getPost(slug) {
    const res = await fetch(
        `https://portfolio-2026-cms.ddev.site/wp-json/wp/v2/posts?slug=${slug}`,
        {
            cache: 'no-store',
        }
    );

    if (!res.ok) {
        throw new Error(
            'Nie udało się pobrać wpisu.'
        );
    }

    const posts = await res.json();

    return posts[0] || null;
}

export default async function BlogPostPage({ params }) {
    const { slug } = await params;

    const post = await getPost(slug);

    if (!post) {
        notFound();
    }

    return (
        <main>
            <h1
                dangerouslySetInnerHTML={{
                    __html: post.title.rendered,
                }}
            />

            <WordPressContent
                html={post.content.rendered}
            />
        </main>
    );
}