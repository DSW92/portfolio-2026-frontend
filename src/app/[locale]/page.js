import BlockRenderer from '@/components/BlockRenderer/BlockRenderer';

async function getPageBlocks(locale) {
    const res = await fetch(
        `https://portfolio-2026-cms.ddev.site/wp-json/bloki-autorskie/v1/page-blocks/7?lang=${locale}`,
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

export default async function HomePage({ params }) {
    const { locale } = await params;
    const page = await getPageBlocks(locale);

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: page.styles || '' }} />
            <BlockRenderer blocks={page.blocks} />
        </>
    );
}