/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, //react-beautifildndのエラーためfalseにする
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
