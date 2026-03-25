/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
  },
  experimental: {
    serverComponentsExternalPackages: ["gray-matter"],
  },
};

export default nextConfig;
