/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // https://picsum.photos/200/200
        protocol: "https",
        hostname: "*",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
