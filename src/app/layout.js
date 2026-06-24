import './globals.scss';
import Header from '@/components/Header/Header';

export const metadata = {
    title: 'Portfolio',
    description: 'Portfolio Headless WordPress',
};

export default function RootLayout({
    children,
}) {
    return (
        <html lang="pl">
            <body>
                <Header />
                <main>
                    {children}
                </main>
            </body>
        </html>
    );
}