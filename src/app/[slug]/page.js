import { notFound } from 'next/navigation';
import BlockRenderer from '@/components/BlockRenderer/BlockRenderer';

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

async function getPageBlocks(pageId) {
    const res = await fetch(
        `http://localhost:8888/portfolio-2026-cms/wp-json/bloki-autorskie/v1/page-blocks/${pageId}`,
        {
            cache: 'no-store',
        }
    );

    if (!res.ok) {
        return null;
    }

    return res.json();
}

export default async function Page({ params }) {
    const { slug } = await params;
    // const resolvedParams = await params;

    const page = await getPage(slug);

    if (!page) {
        notFound();
    }

    const pageBlocks = await getPageBlocks(page.id);

    return (
        <BlockRenderer blocks={pageBlocks.blocks} />
    );
}