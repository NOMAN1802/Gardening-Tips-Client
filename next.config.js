/** @type {import('next').NextConfig} */
const nextConfig = {

  
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // webpack: (config) => {
  //   config.resolve.fallback = {
  //     ...config.resolve.fallback,
  //     fs: false, 
  //   };
  
  //   return config;
  // },
};

module.exports = nextConfig;
