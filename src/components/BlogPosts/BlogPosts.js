import BlogPostsClient from './BlogPostsClient';

export default async function BlogPosts({
    postsPerPage = 6,
    category = 'all'
}) {
    const response = await fetch(
        `https://cms.dominikwojtowicz.pl/wp-json/bloki-autorskie/v1/blog-posts?page=1&per_page=${postsPerPage}&category=${category}`
    );

    const data = await response.json();

    return (
        <BlogPostsClient
            initialData={data}
            postsPerPage={postsPerPage}
            category={category}
        />
    );
}