import { notFound } from 'next/navigation';
import WordPressContent from '@/components/WordPressContent/WordPressContent';

async function getPage(slug) {
    const res = await fetch(
        `http://localhost:8888/portfolio-2026-cms/wp-json/wp/v2/pages?slug=${slug}`,
        {
            next: {
                revalidate: 60,
            },
        }
    );

    const data = await res.json();

    return data[0] || null;
}

export default async function Page({ params }) {
    const { slug } = await params;
    // const resolvedParams = await params;

    const page = await getPage(slug);

    if (!page) {
        notFound();
    }

    return (
        <>
            <WordPressContent html={page.content.rendered} />
        </>
    );
}