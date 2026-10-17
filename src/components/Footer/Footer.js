import styles from './Footer.module.scss';
import Image from 'next/image';

export default function Footer({ locale }) {
    const copyrightText = locale === 'en'
    ? 'All rights reserved.'
    : 'Wszystkie prawa zastrzeżone.';

    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.footerInfo}>
                    <p>Dominik Wojtowicz &middot; <a href="mailto:dominik.s.wojtowicz@gmail.com">dominik.s.wojtowicz@gmail.com</a> &middot; ©<span>{new Date().getFullYear()}</span> {copyrightText}</p>
                </div>
                <div className={styles.footerIcons}>
                    <div className={`${styles.footerIcon} ${styles.linkedin}`}>
                        <a target="_blank" href="https://www.linkedin.com/in/dwojtowicz/">
                            <Image
                                src="/icons/linkedin.svg"
                                alt="Logo"
                                fill
                                sizes="20px"
                            />
                        </a>
                    </div>
                    <div target="_blank" className={`${styles.footerIcon} ${styles.useme}`}>
                        <a href="https://useme.com/pl/roles/contractor/dominik-wojtowicz,408111/">
                            <Image
                                src="/icons/useme.webp"
                                alt="Logo"
                                fill
                                sizes="20px"
                            />
                        </a>
                    </div>
                    <div target="_blank" className={`${styles.footerIcon} ${styles.github}`}>
                        <a href="https://github.com/DSW92">
                            <Image
                                src="/icons/github.svg"
                                alt="Logo"
                                fill
                                sizes="20px"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}