import { DateTime } from "luxon";
import { blogConfig } from "@/lib/config";

export const dynamic = "force-static";

// per https://github.com/vercel/next.js/discussions/80692#discussioncomment-13524001
export function GET() {
  return new Response(`
# roane.xyz - LLMs.txt

## About
See ${blogConfig.baseUrl}${blogConfig.corePages.about}.

## Content Structure
- Posts are located at ${blogConfig.baseUrl}/posts/[slug]

## Key Topics
${blogConfig.description}

## Content Guidelines
- Post frequency: weekly
- Typical post length: 500-1500 words
- Content types: opinions

## Technical Details
- Built with: next.js & fed from notion as a content hub
- Last updated: ${DateTime.now().toString()}
  `);
}
