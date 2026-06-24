import Link from 'next/link';

async function getMenu() {
    const res = await fetch(
        'http://localhost:8888/portfolio-2026-cms/wp-json/custom/v1/menu',
        { cache: 'no-store' }
    );

    return res.json();
}

export default async function Navigation() {
    const menu = await getMenu();

    return (
        <nav>
            <ul style={{ display: 'flex', gap: '20px' }}>
                {menu.map((item) => (
                    <li key={item.url}>
                        <Link href={item.url}>
                            {item.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}