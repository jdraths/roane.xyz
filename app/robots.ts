import { MetadataRoute } from "next";
import { blogConfig } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/"],
      // disallow: [],
    },
    sitemap: [`${blogConfig.baseUrl}/sitemap.xml`],
  };
}
