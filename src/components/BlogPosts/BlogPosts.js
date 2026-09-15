'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import styles from './BlogPosts.module.scss';

export default function BlogPosts({
    postsPerPage = 6
}) {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        async function getPosts() {

            setIsLoading(true);

            try {

                const response = await fetch(
                    `http://localhost:8888/portfolio-2026-cms/wp-json/bloki-autorskie/v1/blog-posts?page=${currentPage}&per_page=${postsPerPage}`
                );

                if (!response.ok) {
                    throw new Error(
                        `HTTP error: ${response.status}`
                    );
                }

                const data = await response.json();

                setPosts(data.posts);

                setTotalPages(
                    data.pagination.totalPages
                );

            } catch (error) {

                console.error(
                    'Błąd pobierania postów:',
                    error
                );

            } finally {

                setIsLoading(false);

            }

        }

        getPosts();

    }, [currentPage, postsPerPage]);

    return (
        <section className={styles.blogPosts}>
            <div className="container">
                {isLoading && (
                    <p>Ładowanie...</p>
                )}

                {!isLoading && (
                    <>
                        <div className={styles.grid}>

                            {posts.map((post) => (

                                <article
                                    key={post.id}
                                    className={styles.post}
                                >

                                    <h2>
                                        <Link
                                            href={`/blog/${post.slug}`}
                                        >
                                            {post.title}
                                        </Link>
                                    </h2>

                                    <p>
                                        {post.excerpt}
                                    </p>

                                </article>

                            ))}

                        </div>

                        <div className={styles.pagination}>

                            {Array.from(
                                { length: totalPages },
                                (_, index) => {

                                    const page = index + 1;

                                    return (
                                        <button
                                            key={page}
                                            type="button"
                                            onClick={() => {
                                                setCurrentPage(page);
                                            }}
                                            className={
                                                currentPage === page
                                                    ? styles.active
                                                    : ''
                                            }
                                        >
                                            {page}
                                        </button>
                                    );
                                }
                            )}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}