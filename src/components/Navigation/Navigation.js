import NavigationClient from '../NavigationClient/NavigationClient';
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

    return <NavigationClient menu={menu} />;
}