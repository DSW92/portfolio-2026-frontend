import PortfolioClient from './PortfolioClient';

export default async function Portfolio({
    postsPerPage = 6,
    category = 'all',
    navigation = null
}) {
    const response = await fetch(
        `https://cms.dominikwojtowicz.pl/wp-json/bloki-autorskie/v1/portfolio?page=1&per_page=${postsPerPage}&category=${category}`
    );

    const data = await response.json();

    return (
        <PortfolioClient
            initialData={data}
            postsPerPage={postsPerPage}
            category={category}
            navigation={navigation}
        />
    );
}