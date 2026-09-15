'use client';

import { useRouter } from 'next/navigation';

export default function WordPressContent({ html }) {
	const router = useRouter();

	function handleClick(event) {

		const link = event.target.closest('a');

		if (!link) {
			return;
		}

		if (
			event.button !== 0 ||
			event.metaKey ||
			event.ctrlKey ||
			event.shiftKey ||
			event.altKey
		) {
			return;
		}

		if (
			link.target === '_blank' ||
			link.hasAttribute('download')
		) {
			return;
		}

		const rawHref = link.getAttribute('href');

		if (
			!rawHref ||
			rawHref.startsWith('#') ||
			rawHref.startsWith('mailto:') ||
			rawHref.startsWith('tel:')
		) {
			return;
		}

		const url = new URL(rawHref, window.location.origin);

		if (url.origin !== window.location.origin) {
			return;
		}

		event.preventDefault();

		router.push(
			`${url.pathname}${url.search}${url.hash}`
		);
	}

	return (
		<div
			onClick={handleClick}
			dangerouslySetInnerHTML={{
				__html: html,
			}}
		/>
	);
}