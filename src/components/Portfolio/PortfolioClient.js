'use client';

import { useEffect, useState, useRef } from 'react';
// import Link from 'next/link';
import Image from 'next/image';
import styles from './Portfolio.module.scss';
import SectionNavigation from '../SectionNavigation.js/SectionNavigation';
import { useParams } from 'next/navigation';
import { h1 } from 'framer-motion/client';

export default function PortfolioClient({
    initialData,
    postsPerPage = 6,
    category = 'all',
    navigation = null
}) {
    const [posts, setPosts] = useState(initialData.posts);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(initialData.pagination.totalPages);
    const [isLoading, setIsLoading] = useState(false);
    const [activeCategory, setActiveCategory] = useState(category);
    const [allCategories, setAllCategories] = useState(initialData.categories);
    const [animationKey, setAnimationKey] = useState(0);

    const { locale } = useParams();

    const previousParams = useRef({
        currentPage: 1,
        postsPerPage,
        activeCategory: category,
    });

    useEffect(() => {

        const params = {
            currentPage,
            postsPerPage,
            activeCategory,
        };

        if (
            params.currentPage === previousParams.current.currentPage &&
            params.postsPerPage === previousParams.current.postsPerPage &&
            params.activeCategory === previousParams.current.activeCategory
        ) {
            return;
        }

        previousParams.current = params;

        async function getPosts() {

            setIsLoading(true);

            try {

                const response = await fetch(
                    `https://cms.dominikwojtowicz.pl/wp-json/bloki-autorskie/v1/portfolio?page=${currentPage}&per_page=${postsPerPage}&category=${activeCategory}`
                );

                if (!response.ok) {
                    throw new Error(
                        `HTTP error: ${response.status}`
                    );
                }

                const data = await response.json();

                setPosts(data.posts);

                setAnimationKey((prev) => prev + 1);

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

    return (
        <section className={styles.portfolio}>
            <div className="container">
                
                {category === 'all' && (
                    <>
                        <h1>{locale === 'en' ? 'Projects' : 'Projekty'}</h1>
                        <div className={styles.categoryButtons}>
                            <button onClick={() => {setActiveCategory("all");setCurrentPage(1)}} className={`${styles.categoryButton} ${activeCategory === 'all' ? styles.active : ''}`} data-id="0" data-slug="all">{locale === 'en' ? 'All' : 'Wszystkie'}</button>
                            {
                                allCategories.map(element => (
                                    <button onClick={() => {setActiveCategory(element.slug);setCurrentPage(1)}} key={element.id} className={`${styles.categoryButton} ${activeCategory === element.slug ? styles.active : ''}`} data-id={element.id} data-slug={element.slug}>
                                        {element.name}
                                    </button>
                                )) 
                            }
                        </div>
                    </>
                )}

                <div
                    key={animationKey}
                    className={`${styles.grid} ${isLoading ? styles.loading : ''} ${animationKey > 0 ? styles.fadeIn : ''}`}
                >

                    {posts.map((post) => (

                        // <article key={post.id} className={styles.post}>
                        //     <a href={post.projectUrl} target="_blank" rel="noopener noreferrer">
                        //         <div className={styles.overlay}>
                        //             <h2>{post.title}</h2>
                        //         </div>
                        //         {post.image && (
                        //             <div className={styles.image}>
                        //                 <Image
                        //                     src={post.image.url}
                        //                     width={post.image.width}
                        //                     height={post.image.height}
                        //                     alt={post.image.alt || post.title}
                        //                 />
                        //             </div>
                        //         )}
                        //     </a>
                        // </article>

                        <article key={post.id} className={styles.post}>
                            <div>
                                <div className={styles.overlay}>
                                    <h2>{post.title}</h2>
                                    {post.projectUrl && (
                                        <a
                                            href={post.projectUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {locale === 'pl' ? 'Strona live' : 'Live website'}
                                        </a>
                                    )}
                                    {post.caseStudyUrl && (
                                        <a
                                            href={post.caseStudyUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Case study
                                        </a>
                                    )}
                                </div>
                                {post.image && (
                                    <div className={styles.image}>
                                        <Image
                                            src={post.image.url}
                                            width={post.image.width}
                                            height={post.image.height}
                                            alt={post.image.alt || post.title}
                                            loading="eager"
                                        />
                                    </div>
                                )}
                            </div>
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

            {navigation && (
                <SectionNavigation {...navigation} />
            )}
            
        </section>
    );
}