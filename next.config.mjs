import createMDX from '@next/mdx'
import rehypeCallouts from 'rehype-callouts'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'


/** @type {import('next').NextConfig} */
const nextConfig = {
    // Configure `pageExtensions` to include MDX files
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
    // Optionally, add any other Next.js config below
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    images: {
      unoptimized: true,
    },
}
 
const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeHighlight, rehypeCallouts],
  }
})

 
// Merge MDX config with Next.js config
export default withMDX(nextConfig)