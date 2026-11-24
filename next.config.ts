import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  devIndicators: false,
  basePath: isGithubPages ? "/site-nails" : "",
  assetPrefix: isGithubPages ? "/site-nails" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
