import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReact from "eslint-plugin-react";
import globals from "globals";
import pluginNext from "@next/eslint-plugin-next";
import importPlugin from "eslint-plugin-import";
import onlyWarn from "eslint-plugin-only-warn";
import unusedImports from "eslint-plugin-unused-imports";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
});

const baseConfig = [
  js.configs.recommended,
  eslintConfigPrettier, // Turns off all rules that are unnecessary or might conflict with Prettier
  ...tseslint.configs.strictTypeChecked,
  {
    ignores: [
      "**/*.hbs",
      "**/*.config.mjs",
      "eslint.config.js",
      "eslint.config.mjs",
    ],
  },
  {
    files: ["**/*.js", "**/*.mjs", "**/*.hbs"],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    plugins: {
      onlyWarn,
    },
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    ignores: [
      "dist/**",
      "**/*.config.mjs",
      "eslint.config.js",
      "eslint.config.mjs",
      "**/*.hbs",
    ],
    rules: {
      "@typescript-eslint/await-thenable": "off",
      // "@typescript-eslint/no-floating-promises": "error", // already in tseslint.configs.strict
      "@typescript-eslint/no-explicit-any": "warn", // overriding tseslint.configs.strict
      "@typescript-eslint/no-unused-vars": "off", // see unusedImports
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "@typescript-eslint/prefer-optional-chain": "error",
      // "@typescript-eslint/prefer-reduce-type-parameter": "error", // already in tseslint.configs.strict
      "@typescript-eslint/prefer-string-starts-ends-with": "error",
      "@typescript-eslint/promise-function-async": "error",
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "unused-imports": unusedImports,
    },
    rules: {
      // "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    ...importPlugin.flatConfigs.typescript,
    rules: {
      "import/named": "off", // per https://typescript-eslint.io/troubleshooting/typed-linting/performance#eslint-plugin-import
      "import/order": "error",
    },
  },
  {
    ...pluginReact.configs.flat.recommended,
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
      },
    },
  },
  {
    plugins: {
      "@next/next": pluginNext,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs["core-web-vitals"].rules,
      "react/button-has-type": "error",
    },
  },
  {
    plugins: {
      "react-hooks": pluginReactHooks,
    },
    settings: { react: { version: "detect" } },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      // React scope no longer necessary with new JSX transform.
      "react/react-in-jsx-scope": "off",
    },
  },
  {
    rules: {
      "react/button-has-type": "error",
    },
  },
];

const eslintConfig = [...baseConfig, ...compat.config({})];

export default eslintConfig;
