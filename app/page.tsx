import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getSortedPostsData } from "@/lib/posts";
import { blogConfig } from "@/lib/config";

export default async function Home() {
  const posts = await getSortedPostsData();

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="mb-16">
        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
          {blogConfig.title}
        </h1>
        <p className="text-xl text-muted-foreground">
          {blogConfig.description}
        </p>
      </section>

      <Separator className="my-8" />

      <section>
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Latest Posts</h2>
          {/* <Button variant="ghost" size="sm">
            View all <ArrowRight className="ml-2 h-4 w-4" />
          </Button> */}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.length > 0 ? (
            posts.map((post) => (
              <Link
                key={post.id}
                href={`/posts/${post.id}`}
                className="hover:text-zinc-300 grow"
              >
                <Card
                  key={post.id}
                  className="flex flex-col overflow-hidden border-zinc-800 bg-zinc-950 transition-all h-full hover:border-zinc-700"
                >
                  <div className="grow">
                    <CardHeader className="pb-4">
                      <CardTitle className="line-clamp-2 text-xl">
                        {post.frontmatter.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="line-clamp-3 text-zinc-400">
                        {post.frontmatter.excerpt}
                      </CardDescription>
                      {/* <div className="text-end my-2 text-sm text-zinc-400">{post.frontmatter.tags ? truncateAtWord({str: post.frontmatter.tags.join(", "), maxLength: 50, ending: ""}) : <>&nbsp;</>}</div> */}
                    </CardContent>
                  </div>
                  <CardFooter className="flex items-center justify-between border-t border-zinc-800 pt-4 text-sm text-zinc-400">
                    <div>
                      {new Date(
                        post.frontmatter.publishedAt,
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <div>{post.frontmatter.readTime}</div>
                  </CardFooter>
                </Card>
              </Link>
            ))
          ) : (
            <p className="text-sm text-zinc-400">Nothing yet 😔</p>
          )}
        </div>
      </section>

      {/* <section className="my-16 rounded-xl bg-zinc-900 p-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-2xl font-bold">Subscribe to the newsletter</h2>
          <p className="mb-6 text-zinc-400">Get the latest posts delivered right to your inbox</p>
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="rounded-md border border-zinc-700 bg-zinc-800 px-4 py-2 focus:border-zinc-600 focus:outline-hidden focus:ring-1 focus:ring-zinc-600"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </section> */}
    </div>
  );
}
