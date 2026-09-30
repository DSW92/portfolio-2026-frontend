'use client';

import { useEffect, useState, useRef } from 'react';
// import Link from 'next/link';
import Image from 'next/image';

import styles from './Portfolio.module.scss';

export default function PortfolioClient({
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
                    `http://localhost:8888/portfolio-2026-cms/wp-json/bloki-autorskie/v1/portfolio?page=${currentPage}&per_page=${postsPerPage}&category=${activeCategory}`
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
                    'Błąd pobierania projektów:',
                    error
                );

            } finally {

                setIsLoading(false);

            }

        }

        getPosts();

    }, [currentPage, postsPerPage, activeCategory]);

    // console.log(allCategories)

    return (
        <section className={styles.portfolio}>
            <div className="container">
                
                {category === 'all' && (
                    <div className={styles.categoryButtons}>
                        <button onClick={() => {setActiveCategory("all");setCurrentPage(1)}} className={`${styles.categoryButton} ${activeCategory === 'all' ? styles.active : ''}`} data-id="0" data-slug="all">Wszystkie</button>
                        {
                            allCategories.map(element => (
                                <button onClick={() => {setActiveCategory(element.slug);setCurrentPage(1)}} key={element.id} className={`${styles.categoryButton} ${activeCategory === element.slug ? styles.active : ''}`} data-id={element.id} data-slug={element.slug}>
                                    {element.name}
                                </button>
                            )) 
                        }
                    </div>
                )}

                <div className={`${styles.grid} ${isLoading ? styles.loading : ''}`}>

                    {posts.map((post) => (

                        <article key={post.id} className={styles.post}>
                            <a href={post.projectUrl} target="_blank" rel="noopener noreferrer">
                                <div className={styles.overlay}>
                                    <h2>{post.title}</h2>
                                </div>
                                {post.image && (
                                    <div className={styles.image}>
                                        <Image
                                            src={post.image.url}
                                            width={post.image.width}
                                            height={post.image.height}
                                            alt={post.image.alt || post.title}
                                        />
                                    </div>
                                )}
                            </a>
                        </article>

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