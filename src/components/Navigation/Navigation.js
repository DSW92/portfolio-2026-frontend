import NavigationClient from '../NavigationClient/NavigationClient';

async function getMenu(locale) {
    const res = await fetch(
        `https://portfolio-2026-cms.ddev.site/wp-json/custom/v1/menu?lang=${locale}`,
        { cache: 'no-store' }
    );

    if (!res.ok) {
        throw new Error('Nie udało się pobrać menu z WordPressa');
    }

    return res.json();
}

export default async function Navigation({ locale }) {
    const menu = await getMenu(locale);

    return <NavigationClient menu={menu} locale={locale} />;
}