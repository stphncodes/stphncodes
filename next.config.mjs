/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
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
