// /** @type {import('next').NextConfig} */

// const nextConfig = {
//   output: 'export', // ✅ tells Next.js to export to static files in /out
//   basePath: '/N8N_X_UI',
//   assetPrefix: '/N8N_X_UI/',

//   eslint: { ignoreDuringBuilds: true },
//   typescript: { ignoreBuildErrors: true },
//   images: { unoptimized: true },
// }

// export default nextConfig

// // N8N_X_UI

import { withNetlify } from '@netlify/next'

export default withNetlify({
  reactStrictMode: true,
  basePath: '/N8N_X_UI',
  assetPrefix: '/N8N_X_UI/',

  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
})