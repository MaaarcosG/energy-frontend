/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "dist",
  reactStrictMode: true,
  images: {
    domains: ["raw.githubusercontent.com"],
    unoptimized: true,
  },
};

export default nextConfig;
