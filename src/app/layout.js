import { Commissioner } from 'next/font/google';
import './globals.scss';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

const commissioner = Commissioner({
    subsets: ['latin', 'latin-ext'],
    display: 'swap',
    variable: '--font-commissioner',
});

export const metadata = {
    title: 'Portfolio',
    description: 'Portfolio Headless WordPress',
};

export default function RootLayout({
    children,
}) {
    return (
        <html lang="pl" className={commissioner.variable}>
            <head>
                <link
					rel="stylesheet"
					href="https://portfolio-2026-cms.ddev.site/wp-json/custom/v1/global-styles"
				/>
            </head>
            <body>
                <Header />
                <main>
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}