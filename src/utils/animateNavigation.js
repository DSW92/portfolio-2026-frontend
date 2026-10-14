import gsap from 'gsap';

export async function animateNavigation(navigate) {
    const page = document.getElementById('page-content');

    if (!page) {
        navigate();
        return;
    }

    await new Promise((resolve) => {
        gsap.to(page, {
            x: -100,
            opacity: 0,
            duration: 0.45,
            ease: 'power3.in',
            onComplete: resolve
        });
    });

    navigate();
}