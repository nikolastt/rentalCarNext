/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "www.localiza.com",
      "storage.googleapis.com",
      "media.discordapp.net",
    ],
  },
};

module.exports = nextConfig;
