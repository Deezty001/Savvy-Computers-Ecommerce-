/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Updated to match your GitHub repository name: 'Savvy-Computers-Site-'
  basePath: '/Savvy-Computers-Site-',
  assetPrefix: '/Savvy-Computers-Site-',
};

export default nextConfig;
