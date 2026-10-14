'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LanguageSwitcher() {
    const pathname = usePathname();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const locale = pathname.startsWith('/en/') || pathname === '/en'
        ? 'en'
        : 'pl';

    async function switchLanguage(targetLocale) {
        if (targetLocale === locale || isLoading) {
            return;
        }

        const fallback = targetLocale === 'en' ? '/en' : '/';

        if (pathname === '/' || pathname === '/en') {
            router.push(fallback);
            return;
        }

        setIsLoading(true);

        try {
            const pageId = document
                .getElementById('current-page-data')
                ?.dataset.pageId;

            if (!pageId) {
                router.push(fallback);
                return;
            }

            const response = await fetch(
                `https://portfolio-2026-cms.ddev.site/wp-json/custom/v1/page-translations/${pageId}`
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
        <div>
            <button
                type="button"
                disabled={isLoading}
                onClick={() => switchLanguage('pl')}
                aria-pressed={locale === 'pl'}
            >
                PL
            </button>

            <span> / </span>

            <button
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