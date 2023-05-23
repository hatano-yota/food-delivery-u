/** @type {import('next').NextConfig} */
const nextConfig = {
  // https://github.com/vercel/next.js/discussions/10522#discussioncomment-28307
  trailingSlash: true, // 追加したもののリロード→404問題は解決しなかった
  output: "out",
  typescript: {},
};

module.exports = nextConfig;
