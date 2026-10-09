/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'portfolio-2026-cms.ddev.site',
            },
        ],
        dangerouslyAllowLocalIP: true,
    },
};

export default nextConfig;
