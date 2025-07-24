import { notFound } from "next/navigation";
import { getPostData, getSortedPostsData } from "@/lib/posts";
// https://github.com/hashicorp/next-mdx-remote?tab=readme-ov-file#react-server-components-rsc--nextjs-app-directory-support
import "@/styles/highlight-js/github-dark.css";

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const post = await getPostData(slug);

  if (!post) {
    notFound();
  }

  // if (!post.frontmatter) {
  //   return post.content;
  // }

  // const components = useMDXComponents({})

  const { frontmatter } = post;

  return (
    <article className="mt-4 prose mx-auto prose-invert">
      <h1 className="mb-2 text-4xl font-bold">{frontmatter.title}</h1>
      <p className="">
        {frontmatter.publishedAt} &middot; {frontmatter.readTime} &middot;{" "}
        {frontmatter.tags}
      </p>
      <div className="mt-8">{post.content}</div>
    </article>
  );
}

export async function generateStaticParams() {
  const posts = await getSortedPostsData();
  return posts.flatMap((post) => [
    { slug: post.id },
    { slug: post.id + ".md" },
  ]);
}
