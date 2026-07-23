import Link from 'next/link';
import styles from './Navigation.module.scss';

async function getMenu() {
    const res = await fetch(
        'http://localhost:8888/portfolio-2026-cms/wp-json/custom/v1/menu',
        { cache: 'no-store' }
    );

    return res.json();
}

export default async function Navigation() {
    const menu = await getMenu();

    console.log(menu[0].url);

    return (       
        <nav className={styles.nav}>
            <div className="site-logo">
                <a href={menu[0].url}>DSW</a>
            </div>
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