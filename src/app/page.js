import BlockRenderer from '@/components/BlockRenderer/BlockRenderer';

async function getPageBlocks() {
    const res = await fetch(
        'https://portfolio-2026-cms.ddev.site/wp-json/bloki-autorskie/v1/page-blocks/7',
        {
            cache: 'no-store',
        }
    );

    if (!res.ok) {
        throw new Error(
            'Nie udało się pobrać bloków strony głównej.'
        );
    }

    return res.json();
}

export default async function HomePage() {
    const page = await getPageBlocks();

    return (
        <BlockRenderer
            blocks={page.blocks}
        />
    );
}