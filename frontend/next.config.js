/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/api/:slug*",
        destination: "http://0.0.0.0:8000/:slug*",
      },
    ];
  },
};

module.exports = nextConfig;
