/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    unoptimized: true,
    domains:["fiverr-res.cloudinary.com"]
  }
}

module.exports = nextConfig
