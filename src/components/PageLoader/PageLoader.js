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
                <radialGradient id='a17' cx='.66' fx='.66' cy='.3125' fy='.3125' gradientTransform='scale(1.5)'>
                    <stop offset='0' stopColor='#dfdfdf'></stop>
                    <stop offset='.3' stopColor='#dfdfdf' stopOpacity='.9'></stop>
                    <stop offset='.6' stopColor='#dfdfdf' stopOpacity='.6'></stop>
                    <stop offset='.8' stopColor='#dfdfdf' stopOpacity='.3'></stop>
                    <stop offset='1' stopColor='#dfdfdf' stopOpacity='0'></stop>
                </radialGradient>
                <circle transformOrigin='center' fill='none' stroke='url(#a17)' strokeWidth='15' strokeLinecap='round' strokeDasharray='200 1000' strokeDashoffset='0' cx='100' cy='100' r='70'><animateTransform type='rotate' attributeName='transform' calcMode='spline' dur='2' values='360;0' keyTimes='0;1' keySplines='0 0 1 1' repeatCount='indefinite'></animateTransform></circle>
                <circle transformOrigin='center' fill='none' opacity='.2' stroke='#dfdfdf' strokeWidth='15' strokeLinecap='round' cx='100' cy='100' r='70'></circle>
            </svg>
        </div>
    );
});

export default PageLoader;