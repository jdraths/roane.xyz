import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import rehypeCallouts from "rehype-callouts";
import remarkGfm from "remark-gfm";
import { DateTime } from "luxon";
import { truncateAtWord } from "./utils";
import { MDXComponents } from "@/mdx-components";

const postsDirectory = path.join(process.cwd(), "posts");

export async function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map(async (fileName) => {
    // Remove ".mdx" from file name to get id
    const id = fileName.replace(/\.mdx$/, "");

    return getPostData(id);
  });
  // Sort posts by date
  return Promise.all(allPostsData).then((posts) => {
    return posts
      .filter((p) => !!p)
      .sort((a, b) => {
        if (
          DateTime.fromISO(a.frontmatter.publishedAt) <
          DateTime.fromISO(b.frontmatter.publishedAt)
        ) {
          return 1;
        } else {
          return -1;
        }
      });
  });
}

// should line up with renamed + defaults frontmatter in `scripts/notion-to-md.ts`
type TFrontmatter = {
  id: string;
  title: string;
  publishedAt: string;
  updatedAt: string;
  excerpt: string;
  readTime: string;
  tags?: string[];
};

export async function getPostData(id: string) {
  try {
    const fullPath = path.join(postsDirectory, `${id}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use compileMDX with the same plugins as in next.config.mjs
    const { frontmatter, content } = await compileMDX<TFrontmatter>({
      source: fileContents,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeHighlight, rehypeCallouts],
        },
      },
      components: MDXComponents({}),
    });

    // Combine the data with the id and content
    return {
      id,
      content,
      frontmatter: {
        ...frontmatter,
        tags: frontmatter.tags
          ? truncateAtWord({
              str: frontmatter.tags.join(", "),
              maxLength: 50,
              ending: "",
            })
          : "",
      },
    };
  } catch (error) {
    if (error) {
      console.log(
        "error getting Post",
        typeof error === "object" && "message" in error ? error.message : error,
      );
    }
    return undefined;
  }
}
