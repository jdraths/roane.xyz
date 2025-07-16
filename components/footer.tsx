import Link from "next/link";
import { Github, Twitter } from "lucide-react";
import { blogConfig } from "@/lib/config";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 py-8">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold">{blogConfig.title}</h3>
            <p className="text-sm text-zinc-400">{blogConfig.description}</p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Links</h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              {Object.entries(blogConfig.corePages).map(([key, value]) => (
                <li key={key}>
                  <Link href={value} className="hover:text-zinc-300 capitalize">
                    {key}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Follow</h3>
            <div className="flex space-x-4">
              <Link
                href="https://x.com/RoaneDraths"
                className="text-zinc-400 hover:text-zinc-300"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://github.com/jdraths"
                className="text-zinc-400 hover:text-zinc-300"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              {/* <Link href="#" className="text-zinc-400 hover:text-zinc-300">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link> */}
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-zinc-800 pt-8 text-center text-sm text-zinc-400">
          <p>
            &copy; {new Date().getFullYear()} {blogConfig.title} All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
