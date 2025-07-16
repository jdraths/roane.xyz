import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { blogConfig } from "@/lib/config";

export function Navbar() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-bold">
            {blogConfig.title}
          </Link>
          <nav className="hidden md:flex">
            <ul className="flex gap-6">
              {Object.entries(blogConfig.corePages).map(([key, value]) => (
                <li key={key}>
                  <Link
                    href={value}
                    className="text-sm hover:text-zinc-300 capitalize"
                  >
                    {key}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {/* <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Button className="hidden md:inline-flex">Subscribe</Button> */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="border-zinc-800 bg-zinc-950 p-0"
            >
              <nav className="grid gap-6 p-6">
                {Object.entries(blogConfig.corePages).map(([key, value]) => (
                  <li key={key}>
                    <Link
                      href={value}
                      className="text-lg font-semibold hover:text-zinc-300 capitalize"
                    >
                      {key}
                    </Link>
                  </li>
                ))}
                {/* <Button className="mt-4">Subscribe</Button> */}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
