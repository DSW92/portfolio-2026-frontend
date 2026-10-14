import Navigation from '../Navigation/Navigation';
import styles from './Header.module.scss';

export default function Header({ locale }) {
    return (
        <header className={styles.header}>
            <Navigation locale={locale} />
        </header>
    );
}