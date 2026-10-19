'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

import styles from './BlogPosts.module.scss';

export default function BlogPostsClient({
    initialData,
    postsPerPage = 6,
    category = 'all'
}) {
    const [posts, setPosts] = useState(initialData.posts);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(initialData.pagination.totalPages);
    const [isLoading, setIsLoading] = useState(false);
    const [activeCategory, setActiveCategory] = useState(category);
    const [allCategories, setAllCategories] = useState(initialData.categories);

    const isFirstRender = useRef(true);

    useEffect(() => {

        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        async function getPosts() {

            setIsLoading(true);

            try {

                const response = await fetch(
                    `https://cms.dominikwojtowicz.pl/wp-json/bloki-autorskie/v1/blog-posts?page=${currentPage}&per_page=${postsPerPage}&category=${activeCategory}`
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

                setAllCategories(data.categories);

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

    }, [currentPage, postsPerPage, activeCategory]);

    return (
        <section className={`${styles.blogPosts} ${isLoading ? styles.loading : ''}`}>
            <div className="container">
                
                {category === 'all' && (
                    <>
                        <button onClick={() => {setActiveCategory("all");setCurrentPage(1)}} className={`${styles.categoryButton} ${activeCategory === 'all' ? styles.active : ''}`} data-id="0" data-slug="all">Wszystkie</button>
                        {
                            allCategories.map(element => (
                                <button onClick={() => {setActiveCategory(element.slug);setCurrentPage(1)}} key={element.id} className={`${styles.categoryButton} ${activeCategory === element.slug ? styles.active : ''}`} data-id={element.id} data-slug={element.slug}>
                                    {element.name}
                                </button>
                            )) 
                        }
                    </>
                )}

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

                        // <article key={post.id} className={styles.post}>

                        // </article>

                    ))}

                </div>

                {totalPages > 1 && (
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
                )}
                    
            </div>
        </section>
    );
}