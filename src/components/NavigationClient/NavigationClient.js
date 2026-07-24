'use client';

import Link from 'next/link';
import styles from './NavigationClient.module.scss';
import { useState, useEffect } from 'react';

export default function NavigationClient({ menu }) {
    const [isActive, setIsActive] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

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

    return (
        <nav className={styles.nav}>
            <div className="container">
                <div className={styles.siteLogo}>
                    <Link href="/">DSW</Link>
                </div>
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
                                href={item.url}
                                onClick={closeMenu}
                            >
                                {item.title}
                            </Link>
                        </li>
                    ))}
                </ul>
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