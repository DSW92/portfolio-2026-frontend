'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
    const pathname = usePathname();

    const links = [
        {
            href: '/',
            label: 'Start',
        },
        {
            href: '/about',
            label: 'O mnie',
        },
        {
            href: '/projects',
            label: 'Projekty',
        },
        {
            href: '/blog',
            label: 'Blog',
        },
        {
            href: '/contact',
            label: 'Kontakt',
        },
    ];

    return (
        <nav>
            <ul>
                {links.map((link) => (
                    <li key={link.href}>
                        <Link
                            href={link.href}
                            className={
                                pathname === link.href
                                    ? 'active'
                                    : ''
                            }
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}