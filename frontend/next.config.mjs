const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '**' },
    ],
  },
  output: 'export',
  basePath: isProd ? '/omnicast' : undefined,
  experimental: {
    webpackBuildWorker: false,
    workerThreads: false,
    cpus: 1,
  },
};

export default nextConfig;

