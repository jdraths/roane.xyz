import type { MDXComponents } from "mdx/types";
import Image from "next/image";

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including components from
// other libraries.

// This file is required to use MDX in `app` directory.
export function MDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Handle images with proper paths for Next.js
    img: ({ src, alt, ...props }: { src?: string; alt?: string; [key: string]: any }) => {
      // Images are now served directly from /media/ since they're in public/media/
      const imageSrc = src ?? '';
      return (
        <Image
          src={imageSrc}
          alt={alt ?? ''}
          width={800}
          height={400}
          className="rounded-lg my-4"
          {...props}
        />
      );
    },
    // Apply custom styling to MDX components
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mt-6 mb-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold mt-4 mb-2">{children}</h3>
    ),
    // Improve code blocks styling
    pre: (props) => (
      <pre className="p-4 overflow-auto rounded-none my-4 hljs" {...props} />
    ),
    code: (props) => <code className="font-mono text-sm" {...props} />,
    // Style task lists
    ul: ({ children, className, ...props }: { children?: React.ReactNode; className?: string; [key: string]: any }) => {
      // Check if this is a task list (contains li > input[type="checkbox"])
      const isTaskList = className?.includes("contains-task-list");

      return (
        <ul
          className={`${className ?? ""} ${isTaskList ? "list-none pl-0" : "list-disc pl-5"} my-4`}
          {...props}
        >
          {children}
        </ul>
      );
    },
    li: ({ children, ...props }: { children?: React.ReactNode; [key: string]: any }) => {
      // Check if this list item contains a checkbox
      const hasCheckbox =
        Array.isArray(children) &&
        children.some(
          (child) =>
            typeof child === "object" && 
            child !== null && 
            "props" in child &&
            (child as any).props?.type === "checkbox",
        );

      return (
        <li
          className={`${hasCheckbox ? "flex items-start gap-2" : ""} my-1`}
          {...props}
        >
          {children}
        </li>
      );
    },
    // Add all other default components
    ...components,
  };
}
