'use client';

import { forwardRef, useImperativeHandle, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './PageLoader.module.scss';

gsap.registerPlugin(useGSAP);

const PageLoader = forwardRef(function PageLoader(props, ref) {
    const loaderRef = useRef(null);

    useImperativeHandle(ref, () => ({
        show() {
            gsap.killTweensOf(loaderRef.current);

            return gsap.to(loaderRef.current, {
                autoAlpha: 1,
                duration: 0.4,
                ease: 'power2.inOut'
            });
        },

        hide() {
            gsap.killTweensOf(loaderRef.current);

            return gsap.to(loaderRef.current, {
                autoAlpha: 0,
                duration: 0.8,
                ease: 'power2.inOut'
            });
        }
    }), []);

    return (
        <div ref={loaderRef} className={styles.loader}>
            <span className={styles.logo}>DSW</span>
        </div>
    );
});

export default PageLoader;