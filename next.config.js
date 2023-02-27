/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    loader:'cloudinary',
    path:'https://res.cloudinary.com/dkpmbfyub/image/upload/',
  }
}

module.exports = nextConfig
