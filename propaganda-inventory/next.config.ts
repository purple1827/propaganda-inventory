import type { NextConfig } from "next";

const repoName = "propaganda-inventory"; // 這裡改成你的 repo 名稱

const nextConfig: NextConfig = {
  output: "export",
  basePath: `/${repoName}`,
  assetPrefix: `/${repoName}/`,
};

export default nextConfig;