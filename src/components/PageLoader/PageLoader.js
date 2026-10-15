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
            <span className={styles.logo}>
                DSW
            </span>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'>
                <circle fill='#dfdfdf' stroke='#dfdfdf' strokeWidth='15' r='15' cx='40' cy='65'>
                    <animate attributeName='cy' calcMode='spline' dur='2' values='65;135;65;' keySplines='.5 0 .5 1;.5 0 .5 1' repeatCount='indefinite' begin='-.4'></animate>
                </circle>
                <circle fill='#dfdfdf' stroke='#dfdfdf' strokeWidth='15' r='15' cx='100' cy='65'>
                    <animate attributeName='cy' calcMode='spline' dur='2' values='65;135;65;' keySplines='.5 0 .5 1;.5 0 .5 1' repeatCount='indefinite' begin='-.2'></animate>
                </circle>
                <circle fill='#dfdfdf' stroke='#dfdfdf' strokeWidth='15' r='15' cx='160' cy='65'>
                    <animate attributeName='cy' calcMode='spline' dur='2' values='65;135;65;' keySplines='.5 0 .5 1;.5 0 .5 1' repeatCount='indefinite' begin='0'></animate>
                </circle>
            </svg>
        </div>
    );
});

export default PageLoader;