import { Separator } from "@/components/ui/separator";
import { getSortedPostsData } from "@/lib/posts";

export default async function Home() {
  const posts = await getSortedPostsData();

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="mb-16">
        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
          About
        </h1>
      </section>

      <Separator className="my-8" />

      <section>
        <article className="mt-4 mx-auto prose prose-invert">
          <h2 className="text-2xl font-semibold">I'm Roane</h2>
          <p>
            I'm a software engineer and investor. In my younger (more
            egocentric) days I considered myself a budding polymath, but now I
            realize I'm just a man of many hobbies.
          </p>

          <h2 className="text-2xl font-semibold">What I'm writing about</h2>
          <p>
            I'm interested in AI, software, public goods and investing, and I
            plan to write about all of the above.
          </p>

          <h2 className="text-2xl font-semibold">And why I'm writing</h2>
          <p>
            I've been writing privately for 5+ years, and this blog is meant to
            challenge me to exercise this muscle publicly. I hope that writing
            in public helps me to become more succinct and clear, and I hope to
            meet some interesting people along the way. Please get in touch on{" "}
            <a href="https://x.com/RoaneDraths">x</a>.
          </p>
          <p>
            Gwern's thoughts on why you should write (
            <a href="https://marginalrevolution.com/marginalrevolution/2024/08/the-wisdom-of-gwern-why-should-you-write.html">
              here
            </a>
            ) and (<a href="https://gwern.net/llm-writing">here</a>) are a core
            inspiration for this blog.
          </p>
          <p>
            And this quote was a core impetus to get me moving, because I
            certainly don't want to be a passive zombie:
          </p>
          <blockquote>
            <p>
              For the masses of men do not create their own ideas, or indeed
              think through these ideas independently; they follow passively the
              ideas adopted and disseminated by the body of intellectuals.
            </p>
            <span className="not-italic">
              -- Murray Rothbard, <i>Anatomy of the State</i>
            </span>
          </blockquote>
        </article>
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
