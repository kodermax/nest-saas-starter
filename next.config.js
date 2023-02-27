/* eslint-disable @typescript-eslint/no-var-requires */

/** @type {import('next').NextConfig} */

module.exports = {
  trailingSlash: true,
  reactStrictMode: false,
  experimental: {
    esmExternals: false
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias
    }

    return config
  }
}
