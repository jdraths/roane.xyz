import { MetadataRoute } from "next";
import { DateTime } from "luxon";

import { getSortedPostsData } from "@/lib/posts";
import { blogConfig } from "@/lib/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // dynamic sitemap using blogConfig.corePages
  const corePages = Object.entries(blogConfig.corePages).map(([key, value]) => {
    const isHome = key === "home";
    return {
      // url = baseUrl + corePages.value
      url: `${blogConfig.baseUrl}${isHome ? "" : value}`,
      lastModified: new Date(),
      changeFrequency: (isHome
        ? "daily"
        : "monthly") as MetadataRoute.Sitemap[number]["changeFrequency"],
      priority: isHome ? 1 : 0.9,
    };
  });

  // and posts
  const posts = await getSortedPostsData();

  const sitemap: MetadataRoute.Sitemap = [
    ...corePages,
    ...posts.map((e) => ({
      url: `${blogConfig.baseUrl}/posts/${e.id}`,
      lastModified: DateTime.fromISO(e.frontmatter.updatedAt).toJSDate(),
      changeFrequency:
        "daily" as MetadataRoute.Sitemap[number]["changeFrequency"],
      priority: 0.8,
    })),
  ];

  return sitemap;
}
