import { withSentryConfig } from "@sentry/nextjs";
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

export default withSentryConfig(nextConfig, {
    org: "matchuri",
    project: "matchuri-frontend",

    silent: !process.env.CI,

    widenClientFileUpload: true,

    webpack: {
        treeshake: {
            removeDebugLogging: true,
        },
    },
});