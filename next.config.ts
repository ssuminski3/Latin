import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // Removes reliance on static export
};

export default nextConfig;
