/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'framerusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: '9h5ay9m2nk8dfaam.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'kayakalap.vercel.app',
      }
    ],
  },
}

export default nextConfig;
