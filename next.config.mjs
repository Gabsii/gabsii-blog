import { withPayload } from '@payloadcms/next/withPayload'
import { paraglide } from "@inlang/paraglide-js-adapter-next/plugin"

/** @type {import('next').NextConfig} */
const nextConfig = paraglide({
  paraglide: {
		project: "./project.inlang",
		outdir: "./src/paraglide",
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
})

export default withPayload(nextConfig)
