'use client';

import { createContext, useContext, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import PageLoader from '../PageLoader/PageLoader';

gsap.registerPlugin(useGSAP);

const PageTransitionContext = createContext(null);

export function usePageTransition() {
    const context = useContext(PageTransitionContext);

    if (!context) {
        throw new Error('usePageTransition must be used within PageTransition');
    }

    return context;
}

export default function PageTransition({ children }) {
    const isFirstRender = useRef(true);
    const pathname = usePathname();

    const loaderRef = useRef(null);

    function showLoader() {
        return loaderRef.current?.show();
    }

    function hideLoader() {
        return loaderRef.current?.hide();
    }

    const previousLocale = useRef(null);

    const locale = pathname === '/en' || pathname.startsWith('/en/')
        ? 'en'
        : 'pl';

    useGSAP(() => {
        const isLanguageChange =
            previousLocale.current !== null &&
            previousLocale.current !== locale;

        previousLocale.current = locale;

        if (isLanguageChange) {
            return;
        }

        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const page = document.getElementById('page-content');

        if (!page) return;

        gsap.fromTo(
            page,
            {
                x: 100,
                opacity: 0
            },
            {
                x: 0,
                opacity: 1,
                duration: 0.65,
                ease: 'power3.out',
                clearProps: 'transform,opacity'
            }
        );
    }, { dependencies: [pathname] });

    useGSAP(() => {
        const page = document.getElementById('page-content');

        if (!page) return;

        hideLoader();
    }, { dependencies: [pathname] });

    return (
        <PageTransitionContext.Provider value={{ showLoader, hideLoader }}>
            <PageLoader ref={loaderRef} />
            {children}
        </PageTransitionContext.Provider>
    );
}