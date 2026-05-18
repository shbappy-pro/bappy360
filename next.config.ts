import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  allowedDevOrigins: [
    "preview-61b72735-b446-4147-ad5c-73986fb605a0.space.chatglm.site",
    "preview-chat-8af87903-ca35-4caf-be7a-1243d2976246.space-z.ai",
    "preview-chat-61b72735-b446-4147-ad5c-73986fb605a0.space-z.ai",
    "space-z.ai",
  ],
  images: {
    formats: ["image/avif", "image/webp"],
  },
  compress: true,
};

export default nextConfig;
