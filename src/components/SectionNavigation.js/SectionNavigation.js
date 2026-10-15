'use client';

import Link from 'next/link';
import styles from './SectionNavigation.module.scss';

import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

export default function SectionNavigation({ scroll, href, label, scrollTo }) {

    const scrollToNextSection = (event) => {
        const currentSection = event.currentTarget.closest('section');

        const sections = [
            ...document.querySelectorAll('#page-content > section'),
        ];

        const currentIndex = sections.indexOf(currentSection);

        if (currentIndex === -1) {
            return;
        }

        const nextSection = sections[currentIndex + 1];

        if (!nextSection) {
            return;
        }

        gsap.to(window, {
            duration: 1.2,
            scrollTo: {
                y: nextSection,
                autoKill: true,
            },
            ease: 'power2.inOut',
            overwrite: 'auto',
        });
    };

    return (
        <nav className={styles.navigation} aria-label="Nawigacja sekcji">

            {scroll ? (
                <button
                    type="button"
                    onClick={scrollToNextSection}
                    className={styles.scrollButton}
                    aria-label="Przewiń do następnej sekcji"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#dfdfdf"
                        viewBox="0 0 24 24"
                    >
                        <path d="m17.117,13.118l-4.617,4.617V5h-1v12.733l-4.617-4.617-.707.707,4.718,4.717c.295.296.688.459,1.107.459s.812-.163,1.106-.459l4.717-4.716-.707-.707Z"/>
                    </svg>
                    {scrollTo}
                </button>
            ) : (
                <div />
            )}

            {href && (
                <Link href={href} className={styles.pageButton}>
                    {label}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#dfdfdf" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
                        <path d="m18.541,10.894l-4.717-4.717-.707.707,4.616,4.617H5v1h12.735l-4.618,4.617.707.707,4.717-4.716c.296-.296.459-.69.459-1.108s-.163-.812-.459-1.106Z"/>
                    </svg>
                </Link>
            )}

        </nav>
    );
}