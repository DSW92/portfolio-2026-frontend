'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { usePageTransition } from '../PageTransition/PageTransition';
import styles from './LanguageSwitcher.module.scss';

export default function LanguageSwitcher({lang}) {
    const pathname = usePathname();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { showLoader, hideLoader } = usePageTransition();

    const locale = pathname.startsWith('/en/') || pathname === '/en'
        ? 'en'
        : 'pl';

    async function switchLanguage(targetLocale) {
        if (targetLocale === locale || isLoading) {
            return;
        }

        const fallback = targetLocale === 'en' ? '/en' : '/';

        setIsLoading(true);
        await showLoader();

        if (pathname === '/' || pathname === '/en') {
            router.push(fallback);
            return;
        }

        try {
            const pageId = document
                .getElementById('current-page-data')
                ?.dataset.pageId;

            if (!pageId) {
                router.push(fallback);
                return;
            }

            const response = await fetch(
                `https://cms.dominikwojtowicz.pl/wp-json/custom/v1/page-translations/${pageId}`
            );

            if (!response.ok) {
                throw new Error('Nie udało się pobrać tłumaczeń');
            }

            const translations = await response.json();
            router.push(translations[targetLocale]?.url || fallback);
        } catch (error) {
            console.error('Language switch error:', error);
            router.push(fallback);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className={styles.languageSwitcher}>
            <button
                className={lang === 'pl' ? styles.active : ''}
                type="button"
                disabled={isLoading}
                onClick={() => switchLanguage('pl')}
                aria-pressed={locale === 'pl'}
            >
                PL
            </button>

            <span> / </span>

            <button
                className={lang === 'en' ? styles.active : ''}
                type="button"
                disabled={isLoading}
                onClick={() => switchLanguage('en')}
                aria-pressed={locale === 'en'}
            >
                EN
            </button>
        </div>
    );
}