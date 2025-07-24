/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: `${process.env.NEXT_PUBLIC_API_ROOT_MEDIA}`,
        port: '',
        pathname: '/**',
      },
      {
        protocol: "http",
        hostname: `${process.env.NEXT_PUBLIC_API_ROOT_MEDIA}`,
        port: "1337",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
