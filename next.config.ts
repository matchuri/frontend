import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "asset.matchuri.com",
            },
        ],
    },
};

export default nextConfig;