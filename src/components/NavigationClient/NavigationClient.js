'use client';

import Link from 'next/link';
import styles from './NavigationClient.module.scss';
import { useState, useEffect } from 'react';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import { useRouter } from 'next/navigation';
import { animateNavigation } from '@/utils/animateNavigation';

export default function NavigationClient({ menu, locale }) {
    const [isActive, setIsActive] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const router = useRouter();

    function toggleMenuModal(event) {
        const checked = event.target.checked;

        setIsChecked(checked);

        if (!isActive) {
            setIsActive(true);
            return;
        }
        setIsVisible(checked);
    }

    function closeMenu() {
        setIsChecked(false);
        setIsVisible(false);
    }

    useEffect(() => {
        if (!isActive) {
            return;
        }
        setIsVisible(true);
    }, [isActive]);

    function getLocalizedUrl(url) {
        const path = url.startsWith('/') ? url : `/${url}`;

        if (locale === 'en') {
            return path.startsWith('/en/') || path === '/en'
                ? path
                : `/en${path === '/' ? '' : path}`;
        }

        return path;
    }

    async function handleNavigation(event, url) {
        if (
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey
        ) {
            return;
        }

        event.preventDefault();

        const targetUrl = getLocalizedUrl(url);

        if (window.location.pathname === targetUrl) {
            closeMenu();
            return;
        }

        closeMenu();

        await animateNavigation(() => {
            router.push(targetUrl);
        });
    }

    return (
        <nav className={styles.nav}>
            <div className="container">
                <div className={styles.siteLogo}>
                    <Link href={locale === 'en' ? '/en' : '/'}>DSW</Link>
                </div>
                <div>
                    <ul 
                        className={`
                            ${styles.mainMenu}
                            ${isActive ? styles.active : ''}
                            ${isVisible ? styles.visible : ''}
                        `}
                    >
                        {menu.map((item) => (
                            <li key={item.url}>
                                <Link
                                    href={getLocalizedUrl(item.url)}
                                    onClick={(event) => handleNavigation(event, item.url)}
                                >
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <LanguageSwitcher />
                </div>
                <div className={styles.hamburger}>
                    <input
                        className={styles.toggleChecker}
                        id="toggleChecker"
                        type="checkbox"
                        checked={isChecked}
                        onChange={toggleMenuModal}
                    />
                    <label
                        className={styles.togglerLabel}
                        htmlFor="toggleChecker"
                    >
                        <div className={styles.checkboxToggler}>
                            <div className={styles.line1}></div>
                            <div className={styles.line2}></div>
                            <div className={styles.line3}></div>
                        </div>
                    </label>
                </div>
            </div>
        </nav>
    );
}