import { notFound } from 'next/navigation';

async function getHomePage() {
    const res = await fetch(
        'http://localhost:8888/portfolio-2026-cms/wp-json/custom/v1/front-page',
        {
            // next: { revalidate: 60 },
        }
    );

    if (!res.ok) {
        return null;
    }

    return res.json();
}

export default async function HomePage() {
    const page = await getHomePage();

    if (!page) {
        notFound();
    }

    return (
        <>
            <div
                dangerouslySetInnerHTML={{
                    __html: page.content.rendered,
                }}
            />
        </>
    );
}