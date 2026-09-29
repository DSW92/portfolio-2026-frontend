import PortfolioClient from './PortfolioClient';

export default async function Portfolio({
    postsPerPage = 6,
    category = 'all'
}) {
    const response = await fetch(
        `http://localhost:8888/portfolio-2026-cms/wp-json/bloki-autorskie/v1/portfolio?page=1&per_page=${postsPerPage}&category=${category}`
    );

    const data = await response.json();

    return (
        <PortfolioClient
            initialData={data}
            postsPerPage={postsPerPage}
            category={category}
        />
    );
}