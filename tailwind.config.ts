import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class", "dark"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "65ch",
            color: "var(--tw-prose-body)",
            '[class~="lead"]': {
              color: "var(--tw-prose-lead)",
            },
            a: {
              color: "var(--tw-prose-links)",
              textDecoration: "underline",
              fontWeight: "500",
            },
            strong: {
              color: "var(--tw-prose-bold)",
              fontWeight: "600",
            },
            "a strong": {
              color: "inherit",
            },
            "blockquote strong": {
              color: "inherit",
            },
            "thead strong": {
              color: "inherit",
            },
            ol: {
              listStyleType: "decimal",
            },
            'ol[type="A"]': {
              listStyleType: "upper-alpha",
            },
            'ol[type="a"]': {
              listStyleType: "lower-alpha",
            },
            'ol[type="A" s]': {
              listStyleType: "upper-alpha",
            },
            'ol[type="a" s]': {
              listStyleType: "lower-alpha",
            },
            'ol[type="I"]': {
              listStyleType: "upper-roman",
            },
            'ol[type="i"]': {
              listStyleType: "lower-roman",
            },
            'ol[type="I" s]': {
              listStyleType: "upper-roman",
            },
            'ol[type="i" s]': {
              listStyleType: "lower-roman",
            },
            'ol[type="1"]': {
              listStyleType: "decimal",
            },
            ul: {
              listStyleType: "disc",
            },
            "ol > li::marker": {
              fontWeight: "400",
              color: "var(--tw-prose-counters)",
            },
            "ul > li::marker": {
              color: "var(--tw-prose-bullets)",
            },
            hr: {
              borderColor: "var(--tw-prose-hr)",
              borderTopWidth: 1,
            },
            blockquote: {
              fontWeight: "500",
              fontStyle: "italic",
              color: "var(--tw-prose-quotes)",
              borderLeftWidth: "0.25rem",
              borderLeftColor: "var(--tw-prose-quote-borders)",
              paddingLeft: "1em",
            },
            "blockquote p:first-of-type::before": {
              content: "open-quote",
            },
            "blockquote p:last-of-type::after": {
              content: "close-quote",
            },
            h1: {
              color: "var(--tw-prose-headings)",
              fontWeight: "800",
            },
            "h1 strong": {
              fontWeight: "900",
              color: "inherit",
            },
            h2: {
              color: "var(--tw-prose-headings)",
              fontWeight: "700",
            },
            "h2 strong": {
              fontWeight: "800",
              color: "inherit",
            },
            h3: {
              color: "var(--tw-prose-headings)",
              fontWeight: "600",
            },
            "h3 strong": {
              fontWeight: "700",
              color: "inherit",
            },
            h4: {
              color: "var(--tw-prose-headings)",
              fontWeight: "600",
            },
            "h4 strong": {
              fontWeight: "700",
              color: "inherit",
            },
            img: {},
            "figure > *": {},
            figcaption: {
              color: "var(--tw-prose-captions)",
            },
            code: {
              color: "var(--tw-prose-code)",
              fontWeight: "600",
            },
            "code::before": {
              content: '"`"',
            },
            "code::after": {
              content: '"`"',
            },
            "a code": {
              color: "inherit",
            },
            "h1 code": {
              color: "inherit",
            },
            "h2 code": {
              color: "inherit",
            },
            "h3 code": {
              color: "inherit",
            },
            "h4 code": {
              color: "inherit",
            },
            "blockquote code": {
              color: "inherit",
            },
            "thead code": {
              color: "inherit",
            },
            pre: {
              color: "var(--tw-prose-pre-code)",
              backgroundColor: "var(--tw-prose-pre-bg)",
              overflowX: "auto",
              fontWeight: "400",
            },
            "pre code": {
              backgroundColor: "transparent",
              borderWidth: "0",
              borderRadius: "0",
              padding: "0",
              fontWeight: "inherit",
              color: "inherit",
              fontSize: "inherit",
              fontFamily: "inherit",
              lineHeight: "inherit",
            },
            "pre code::before": {
              content: "none",
            },
            "pre code::after": {
              content: "none",
            },
            table: {
              width: "100%",
              tableLayout: "auto",
              textAlign: "left",
              marginTop: "2em",
              marginBottom: "2em",
            },
            thead: {
              borderBottomWidth: "1px",
              borderBottomColor: "var(--tw-prose-th-borders)",
            },
            "thead th": {
              color: "var(--tw-prose-headings)",
              fontWeight: "600",
              verticalAlign: "bottom",
            },
            "tbody tr": {
              borderBottomWidth: "1px",
              borderBottomColor: "var(--tw-prose-td-borders)",
            },
            "tbody tr:last-child": {
              borderBottomWidth: "0",
            },
            "tbody td": {
              verticalAlign: "baseline",
            },
          },
        },
        invert: {
          css: {
            "--tw-prose-body": "var(--tw-prose-invert-body)",
            "--tw-prose-headings": "var(--tw-prose-invert-headings)",
            "--tw-prose-lead": "var(--tw-prose-invert-lead)",
            "--tw-prose-links": "var(--tw-prose-invert-links)",
            "--tw-prose-bold": "var(--tw-prose-invert-bold)",
            "--tw-prose-counters": "var(--tw-prose-invert-counters)",
            "--tw-prose-bullets": "var(--tw-prose-invert-bullets)",
            "--tw-prose-hr": "var(--tw-prose-invert-hr)",
            "--tw-prose-quotes": "var(--tw-prose-invert-quotes)",
            "--tw-prose-quote-borders": "var(--tw-prose-invert-quote-borders)",
            "--tw-prose-captions": "var(--tw-prose-invert-captions)",
            "--tw-prose-code": "var(--tw-prose-invert-code)",
            "--tw-prose-pre-code": "var(--tw-prose-invert-pre-code)",
            "--tw-prose-pre-bg": "var(--tw-prose-invert-pre-bg)",
            "--tw-prose-th-borders": "var(--tw-prose-invert-th-borders)",
            "--tw-prose-td-borders": "var(--tw-prose-invert-td-borders)",
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config

export default config
