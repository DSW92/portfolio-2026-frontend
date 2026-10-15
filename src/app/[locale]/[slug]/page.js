
import { notFound } from 'next/navigation';
import BlockRenderer from '@/components/BlockRenderer/BlockRenderer';

const API_URL = 'https://portfolio-2026-cms.ddev.site/wp-json';

async function getPage(slug, locale) {
    const res = await fetch(
        `${API_URL}/wp/v2/pages?slug=${encodeURIComponent(slug)}`,
        { cache: 'no-store' }
    );

    if (!res.ok) {
        return null;
    }

    const pages = await res.json();

    // Polylang Free nie filtruje automatycznie REST API po języku.
    // Sprawdzamy więc język znalezionej strony w naszym endpointcie.
    for (const page of pages) {
        const translated = await getPageBlocks(page.id, locale);

        if (translated?.id === page.id) {
            return translated;
        }
    }

    return null;
}

async function getPageBlocks(pageId, locale) {
    const res = await fetch(
        `${API_URL}/bloki-autorskie/v1/page-blocks/${pageId}?lang=${locale}`,
        { cache: 'no-store' }
    );

    if (!res.ok) {
        return null;
    }

    return res.json();
}

export default async function Page({ params }) {
    const { locale, slug } = await params;

    if (!['pl', 'en'].includes(locale)) {
        notFound();
    }

    const page = await getPage(slug, locale);

    if (!page) {
        notFound();
    }

    return (
    <>
        <style dangerouslySetInnerHTML={{ __html: page.styles || '' }} />

        <div
            id="current-page-data"
            data-page-id={page.id}
            hidden
        />

        <BlockRenderer blocks={page.blocks} locale={locale} />
    </>
);
}
