import type { MDXComponents } from "mdx/types";

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including components from
// other libraries.

// This file is required to use MDX in `app` directory.
export function MDXComponents(components: MDXComponents): MDXComponents {
  return {
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
    ul: ({ children, className, ...props }) => {
      // Check if this is a task list (contains li > input[type="checkbox"])
      const isTaskList = className?.includes("contains-task-list");

      return (
        <ul
          className={`${className || ""} ${isTaskList ? "list-none pl-0" : "list-disc pl-5"} my-4`}
          {...props}
        >
          {children}
        </ul>
      );
    },
    li: ({ children, ...props }) => {
      // Check if this list item contains a checkbox
      const hasCheckbox =
        Array.isArray(children) &&
        children.some(
          (child) =>
            typeof child === "object" && child?.props?.type === "checkbox",
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
