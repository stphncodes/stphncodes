/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Canonical URL direction: no trailing slash (so /path and /path/ don't split).
  trailingSlash: false,
  // Force every request onto the single canonical host. The apex domain
  // 301-redirects to www.cloudwithstephen.com so link equity and crawl signals
  // all point one way. (Belt-and-suspenders alongside the host's domain config.)
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "cloudwithstephen.com" }],
        destination: "https://www.cloudwithstephen.com/:path*",
        permanent: true,
      },
    ];
  },
  compiler: {
    // Strip console.* in production builds (keep errors/warnings).
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
  eslint: {
    // ESLint toolchain is decoupled from install due to a registry version
    // conflict (@typescript-eslint/scope-manager@8.61.0). Re-add eslint +
    // eslint-config-next with a pinned, available version to restore linting.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
