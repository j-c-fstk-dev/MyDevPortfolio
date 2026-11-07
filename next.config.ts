import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }],
  },
  // English lives at "/" and Portuguese at "/pt". Internally both are /[lang].
  async redirects() {
    return [{ source: "/en", destination: "/", permanent: true }];
  },
  async rewrites() {
    return [{ source: "/", destination: "/en" }];
  },
};

export default nextConfig;
