/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: process.env.NEXT_PUBLIC_DOMAIN,
                port: '8000',
                pathname: '/**'
            }
        ]
    }
};

export default nextConfig;
