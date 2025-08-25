/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
  // Ensure proper asset handling
  assetPrefix: '',
  // Enable production browser source maps for debugging
  productionBrowserSourceMaps: true,
  // Ensure proper client-side component handling
  experimental: {
    // optimizeCss: true, // Removed due to issues with Vercel deployment
  },
}

module.exports = nextConfig