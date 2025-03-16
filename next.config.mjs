/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GIT_GPT_KEY: process.env.GIT_GPT_KEY,
    API_URL: process.env.API_URL,
  },
};

export default nextConfig;
