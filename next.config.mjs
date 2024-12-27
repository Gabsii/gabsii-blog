import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en', 'de'],
    defaultLocale: 'en'
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // TODO: change
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placewaifu.com',
        pathname: '/image/**'
      }
    ]
  }
}

export default withPayload(nextConfig)
