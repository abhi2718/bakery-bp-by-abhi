/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // The demo content points at Unsplash. When a shop swaps in its own
    // photos, put them in /public/photos and the paths become local — no
    // change is needed here. Add a host only if photos are served from a CDN.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
