'use client';

import Link from 'next/link';
import styles from './SectionNavigation.module.scss';

import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

export default function SectionNavigation({ scroll, href, label }) {

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

            {scroll && (
                <button
                    type="button"
                    onClick={scrollToNextSection}
                    className={styles.scrollButton}
                    aria-label="Przewiń do następnej sekcji"
                >
                    ↓
                </button>
            )}

            {href && (
                <Link href={href} className={styles.pageButton}>
                    {label} →
                </Link>
            )}

        </nav>
    );
}